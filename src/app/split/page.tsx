"use client";

import React, { ChangeEvent, useEffect, useMemo } from "react";
import Page from "@/components/Page";
import cx from "classnames";
import DollarInput from "@/components/split/DollarInput";
import {
  getEmptyPerson,
  PersonSubtotal,
  isEmpty,
  replaceAtIndex,
  formatDollars,
  floorAndDistribute,
  getURLDollarParam,
  getPeopleFromURL,
} from "@/utils/splitUtils";
import Link from "next/link";

const TIMES = "×";

export default function SplitPage() {
  const [total, setTotal] = React.useState<null | number>(() =>
    getURLDollarParam("total"),
  );
  const [subtotal, setSubtotal] = React.useState<number | null>(() =>
    getURLDollarParam("subtotal"),
  );
  const [shared, setShared] = React.useState<number | null>(() =>
    getURLDollarParam("shared"),
  );
  const [people, setPeople] = React.useState<PersonSubtotal[]>(() =>
    getPeopleFromURL(),
  );
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlContainsState = url.searchParams.has("total");

    if (total !== null) {
      url.searchParams.set("total", total + "");
    } else {
      url.searchParams.delete("total");
    }
    if (subtotal !== null) {
      url.searchParams.set("subtotal", subtotal + "");
    } else {
      url.searchParams.delete("subtotal");
    }
    if (shared !== null) {
      url.searchParams.set("shared", shared + "");
    } else {
      url.searchParams.delete("shared");
    }
    if (people.filter((p) => !isEmpty(p, 2)).length > 0) {
      url.searchParams.set("people", btoa(JSON.stringify(people)));
    } else {
      url.searchParams.delete("people");
    }

    if (urlContainsState) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }, [total, subtotal, shared, people]);
  const multiplier = !total || !subtotal ? null : total / subtotal;
  const sharedSplitPerPerson = useMemo(
    () =>
      shared === null
        ? null
        : shared / people.filter((p, i) => !isEmpty(p, i)).length,
    [shared, people],
  );
  const totals = useMemo(() => {
    return floorAndDistribute(
      people.map((person, index) => {
        const personSharedSplit = isEmpty(person, index)
          ? 0
          : sharedSplitPerPerson || 0;
        if (person.subtotal === null || multiplier === null) {
          return 0;
        }
        return (person.subtotal + personSharedSplit) * multiplier;
      }),
    );
  }, [people, sharedSplitPerPerson]);
  const individualSubtotalSum = useMemo(() => {
    return people.reduce((total: number | null, person, i) => {
      const personSharedSplit = isEmpty(person, i)
        ? 0
        : sharedSplitPerPerson || 0;
      return total === null || person.subtotal === null
        ? total
        : total + person.subtotal + personSharedSplit;
    }, 0);
  }, [people, subtotal, sharedSplitPerPerson]);
  useEffect(() => {
    if (
      people.length >= 3 &&
      isEmpty(people[people.length - 1], 2) &&
      isEmpty(people[people.length - 2], 2)
    ) {
      setPeople(people.slice(0, -1));
    } else if (!isEmpty(people[people.length - 1], 2)) {
      setPeople([...people, getEmptyPerson()]);
    }
  }, [people, setPeople]);
  return (
    <Page
      title={"Fast Check Splitter"}
      footer={
        <p className={"pt-3"}>
          If you share your current URL, your totals will be shared too.{" "}
          <a className={"link"} href={"/split"}>
            Reset this page
          </a>{" "}
          if you don't want that.
        </p>
      }
    >
      <p className="mt-6 text-lg leading-5 text-gray-900 dark:text-white">
        A simple utility for quickly splitting bills, optimized for efficient
        input on mobile.
      </p>

      <div className={"mt-5"}>
        <DollarInput
          label={"Total (after tax and tip):"}
          type={"full-width"}
          onChange={(v) => setTotal(v)}
          initialValue={formatDollars(total)}
        />
        <DollarInput
          label={"Subtotal:"}
          type={"full-width"}
          onChange={(v) => setSubtotal(v)}
          initialValue={formatDollars(subtotal)}
          error={
            total != null && subtotal != null && subtotal > total
              ? "The subtotal should not be greater than the total"
              : ""
          }
        />
        <DollarInput
          label={"Total for shared items:"}
          type={"full-width"}
          placeholder={"0.00"}
          initialValue={formatDollars(shared)}
          onChange={(v) => setShared(v)}
        />
        <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700" />
        {people.map((person, index) => {
          const personSharedSplit = isEmpty(person, index)
            ? 0
            : sharedSplitPerPerson || 0;
          return (
            <p className={"mt-3"} key={index}>
              <input
                name={`name-${index}`}
                value={person.name}
                onChange={(e) =>
                  setPeople((o) =>
                    replaceAtIndex(o, index, {
                      ...person,
                      name: e.target.value,
                    }),
                  )
                }
                placeholder={`Person ${index + 1}`}
                className={cx(
                  "w-28 font-bold inline rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset",
                  "placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                  "ring-gray-300 focus:ring-indigo-600 text-gray-900",
                )}
              />
              <b>{":  "}</b>
              <span className={"whitespace-nowrap text-right"}>
                {personSharedSplit > 0 && "("}
                <DollarInput
                  type={"inline"}
                  initialValue={formatDollars(person.subtotal)}
                  onChange={(v) =>
                    setPeople((o) =>
                      replaceAtIndex(o, index, {
                        ...person,
                        subtotal: v,
                      }),
                    )
                  }
                />{" "}
                {personSharedSplit > 0
                  ? "+ " + formatDollars(personSharedSplit) || "???"
                  : ""}
                {personSharedSplit > 0 && ")"} {TIMES}{" "}
                <span>
                  {multiplier === null
                    ? "???"
                    : Math.round(multiplier * 1000) / 1000}
                </span>{" "}
                ={" "}
                <span>
                  $
                  {person.subtotal === null || multiplier == null
                    ? ""
                    : formatDollars(totals[index])}
                </span>
              </span>
            </p>
          );
        })}
      </div>
      {individualSubtotalSum !== null &&
        subtotal !== null &&
        individualSubtotalSum !== subtotal &&
        (individualSubtotalSum < subtotal ? (
          <p className="pt-5 italic text-gray-600">
            ${formatDollars(subtotal - individualSubtotalSum)} of the subtotal
            is still unaccounted for.
          </p>
        ) : (
          <p className="pt-5 italic text-gray-600">
            The individual subtotals add up to{" "}
            {formatDollars(individualSubtotalSum - subtotal)} more than the
            entered subtotal.
          </p>
        ))}
    </Page>
  );
}

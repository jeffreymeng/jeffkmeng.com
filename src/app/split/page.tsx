"use client";

import React from "react";
import Page from "@/components/Page";
import StyledLink from "@/components/StyledLink";

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  // TODO: use flex
  return (
    <div className={"mt-5"}>
      <label
        htmlFor={`input-${label}`}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="number"
          name={`input-${label}`}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

function replaceAtIndex<T>(arr: T[], i: number, val: T): T[] {
  const dup = arr.slice();
  dup[i] = val;
  return dup;
}

function isZero(x: null | number) {
  return x === null || x === 0;
}

function parseMoney(x: string) {
  const n = parseFloat(x);
  if (isNaN(n)) {
    return null;
  }
  return Math.round(n * 100);
}

function formatMoney(x: number | null) {
  if (x === null) return "";
  const dollars = Math.floor(x / 100);
  const cents = ("" + (x % 100)).padEnd(2, "0");
  return `${dollars}.${cents}`;
}

const TIMES = "×";

export default function SplitPage() {
  const [total, setTotal] = React.useState<null | number>(null);
  const [subtotal, setSubtotal] = React.useState<number | null>(null);
  const [shared, setShared] = React.useState<number | null>(null);
  const [people, setPeople] = React.useState<(number | null)[]>([null, null]);
  console.log(people);
  return (
    <Page title={"Fast Check Splitter"}>
      <p className="mt-6 text-lg leading-5 text-gray-900 dark:text-white">
        A simple utility for quickly splitting bills, optimized for efficient
        input on mobile.
      </p>
      {/*TODO: store input and money (to handle invalid input, turn red), emit a onChange only on valid input.
      Call component moneyinput.*/}
      <div className={"mt-5"}>
        <Input label={"Total (including tax and tip)"} />
        <Input label={"Subtotal"} />
        <Input label={"Shared Items"} />
        {people.map((personSubtotal, index) => (
          <p className={"mt-3"} key={index}>
            <b>Person {index + 1}</b>:{" "}
            <input
              type="number"
              className="w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={personSubtotal == null ? "" : formatMoney(personSubtotal)}
              onChange={(e) => {
                setPeople((o) => {
                  const arr = replaceAtIndex(
                    o,
                    index,
                    parseMoney(e.target.value)
                  );
                  if (
                    arr.length >= 3 &&
                    isZero(arr[arr.length - 1]) &&
                    isZero(arr[arr.length - 2])
                  ) {
                    arr.pop();
                  } else if (!isZero(arr[arr.length - 1])) {
                    arr.push(null);
                  }
                  return arr;
                });
              }}
            />{" "}
            {TIMES} <span>1.2577</span> ={" "}
            <span>
              $
              {personSubtotal === null
                ? ""
                : formatMoney(Math.round(personSubtotal * 1.2577))}
            </span>
          </p>
        ))}
        {/*  TODO: make the cents add up for the calculation instead of rounding. */}
      </div>
    </Page>
  );
}

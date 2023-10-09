"use client";
import cx from "classnames";
import React, { ReactNode, useState } from "react";
import Page from "@/components/Page";

type Converter = {
  title: string;
  isInvalid?: (x: string) => boolean | string;

  parse: (x: string) => number;
  display: (x: number) => string;
};
export default function NumbersPage() {
  const [num, setNum] = useState<number | null>(null); // decimal representation of the current number
  const [value, setValue] = useState<string>(""); // holds "invalid state" for the active input
  const [active, setActive] = useState<number>(0);
  const rangeBasedInvalid = (num: number) => {
    if (num > 2 ** 31 - 1 || num < (-2) ** 31) {
      return "Number is outside of signed 32-bit integer range!";
    }
    return false;
  };
  const converters: Converter[] = [
    {
      title: "Decimal",
      isInvalid: (x: string) => rangeBasedInvalid(parseInt(x, 10)),
      parse: (x: string) => parseInt(x, 10),
      display: (x: number) => x + "",
    },
    {
      title: "Binary (32-bit two's compliment)",
      isInvalid: (x: string) => {
        if (x.length > 32) {
          return "Length is longer than 32 bits!";
        } else if (x.split("").some((c) => c != "0" && c != "1")) {
          return "Contains unrecognized digits!";
        }

        return false;
      },
      parse: (x: string) => ~~parseInt(x, 2), // https://stackoverflow.com/a/37022667/5511561
      display: (x: number) => (x >>> 0).toString(2).padStart(32, "0"),
    },
    {
      title: "Hex",
      isInvalid: (x: string) => rangeBasedInvalid(parseInt(x, 16)),
      parse: (x: string) => parseInt(x, 16),
      display: (x: number) => (x >>> 0).toString(16).toUpperCase(),
    },
    // {
    //   title: "Ascii",
    //   parse: (x: string) => parseInt(x, 2),
    //   display: (x: number) => (x >>> 0).toString(2),
    // }
  ];
  const defaultIsInvalid = (s: string) => false;
  return (
    <Page title={"Number Representation Converters"} noFooter>
      {converters.map(
        ({ title, parse, display, isInvalid = defaultIsInvalid }, i) => (
          <div className="max-w-sm mt-6" key={title}>
            <label
              htmlFor={"converter" + i}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {title}
            </label>
            <div>
              <input
                id={"converter" + i}
                type="text"
                value={active == i ? value : num == null ? "" : display(num)}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (active != i) {
                    setActive(i);
                  }
                  setValue(newValue);

                  const parsedValue = parse(newValue);
                  if (
                    newValue != "" &&
                    !isInvalid(newValue) &&
                    !Number.isNaN(parsedValue)
                  ) {
                    setNum(parsedValue);
                  } else if (newValue != "") {
                    setNum(null);
                  }
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {active == i && typeof isInvalid(value) == "string" && (
                <p className={"text-red-800"}>{isInvalid(value)}</p>
              )}
            </div>
          </div>
        )
      )}
    </Page>
  );
}

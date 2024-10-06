"use client";
export type Money = number; // integer number of cents

export type PersonSubtotal = {
  name: string;
  subtotal: number | null;
};

export function parseDollars(input: string): Money | null {
  // Parses the input string and returns null if it is invalid, and the dollar
  // amount, in cents, if it is valid. If the input is blank, it is treated as
  // valid and 0 is returned.
  input = input.trim();
  if (input === "") {
    return 0;
  }
  const regex = /^\$?(\d+)?\.?(\d{1,2})?$/;
  const matches = input.match(regex);
  if (!matches) {
    return null;
  }
  const dollars = matches[1] === undefined ? 0 : parseInt(matches[1], 10);
  const cents =
    matches[2] === undefined
      ? 0
      : parseInt(matches[2], 10) * (matches[2].length === 1 ? 10 : 1);
  return dollars * 100 + cents;
}

export function formatDollars(x: Money | null) {
  if (x === null) return "";
  const dollars = Math.floor(x / 100);
  const cents = ("" + (x % 100)).padStart(2, "0");
  return `${dollars}.${cents}`;
}

export function replaceAtIndex<T>(arr: T[], i: number, val: T): T[] {
  const dup = arr.slice();
  dup[i] = val;
  return dup;
}

export function isEmpty(p: PersonSubtotal, i: number) {
  // The first two people are never considered empty
  // Other people are empty if their name is empty and their subtotal is zero or null.
  return i >= 2 && p.name === "" && !p.subtotal;
}

export function getEmptyPerson(): PersonSubtotal {
  return {
    name: "",
    subtotal: null,
  };
}

/**
 * Floors each amount to the nearest cent, and then distributes the remaining
 * cents to the amounts that were originally the closest to the next cent
 * (if the same, tiebreaker is first the total amount, next the index).
 * This has the effect of rounding each quantity in amounts without
 * modifying the total.
 *
 * For example, floorAndDistribute([1000/3, 1000/3, 1000/3]) => [334, 333, 333]
 * @param amounts - Quantities to floor. Each quantity should be a (possibly
 * partial) number of cents.
 */
export function floorAndDistribute(amounts: number[], total?: number): Money[] {
  if (total === undefined) {
    total = Math.round(amounts.reduce((total, val) => total + val, 0));
  }
  const floored = amounts.map((x, i) => ({
    i,
    removedAmount: x - Math.floor(x),
    floored: Math.floor(x),
  }));
  const flooredTotal = floored.reduce((total, val) => total + val.floored, 0);
  const centsToAddBack = total - flooredTotal;
  const distributionPriority = floored.toSorted((a, b) => {
    if (a.removedAmount != b.removedAmount) {
      // first priority is the amount removed (higher amounts first)
      return b.removedAmount - a.removedAmount;
    }
    if (a.floored != b.floored) {
      // second priority is the total amount (higher amounts first)
      return b.floored - a.floored;
    } else {
      // tiebreaker is the index (lower indices first)
      return a.i - b.i;
    }
  });
  for (let i = 0; i < centsToAddBack; i++) {
    distributionPriority[i].floored += 1;
  }
  return floored.map((x) => x.floored);
}

export function getURLDollarParam(key: string) {
  if (typeof window === "undefined") {
    return null;
  }
  const url = new URL(window.location.href);
  const val = url.searchParams.get(key);
  return safeParseDollars(val);
}

function safeParseDollars(amount: string | null) {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    if (amount === null) {
      return null;
    }
    const parsed = parseInt(amount, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

export function getPeopleFromURL(): PersonSubtotal[] {
  try {
    const url = new URL(window.location.href);
    const val = url.searchParams.get("people");
    if (val === null) {
      return [getEmptyPerson(), getEmptyPerson()];
    }
    const parsed: any = JSON.parse(atob(val));
    if (parsed.length < 2) {
      return [getEmptyPerson(), getEmptyPerson()];
    }
    return parsed.map((p: any) => ({
      name: p.name || "",
      subtotal: safeParseDollars(p.subtotal),
    }));
  } catch (e) {
    return [getEmptyPerson(), getEmptyPerson()];
  }
}

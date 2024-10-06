import { expect, test } from "vitest";
import { floorAndDistribute, formatDollars, parseDollars } from "./splitUtils";
import exp from "node:constants";

test("floorAndDistribute handles empty inputs correctly", () => {
  expect(floorAndDistribute([])).toStrictEqual([]);
  expect(floorAndDistribute([0])).toStrictEqual([0]);
});

test("floorAndDistribute doesn't touch already floored amounts", () => {
  expect(floorAndDistribute([1, 2, 3])).toStrictEqual([1, 2, 3]);
});

test("floorAndDistribute doesn't touch already floored amounts", () => {
  expect(floorAndDistribute([1, 2, 3])).toStrictEqual([1, 2, 3]);
  expect(floorAndDistribute([1.6, 2.4, 1, 2, 3, 0])).toStrictEqual([
    2, 2, 1, 2, 3, 0,
  ]);
});

test("floorAndDistribute prioritizes by floored amount", () => {
  expect(floorAndDistribute([33.3, 33.4, 33.3])).toStrictEqual([33, 34, 33]);
});

test("floorAndDistribute breaks ties by index", () => {
  expect(floorAndDistribute([1000 / 3, 1000 / 3, 1000 / 3])).toStrictEqual([
    334, 333, 333,
  ]);
});

test("parseDollars parses zero correctly", () => {
  const inputs = ["", " ", "0", ".", "0.00", ".0", ".00"];
  for (const input of inputs) {
    expect(parseDollars(input)).toBe(0);
  }
});

test("parseDollars parses whole dollars correctly", () => {
  expect(parseDollars("2")).toBe(200);
  expect(parseDollars("10")).toBe(1000);
  expect(parseDollars("17.")).toBe(1700);
  expect(parseDollars("23.0")).toBe(2300);
  expect(parseDollars("1304.0")).toBe(130400);
});

test("parseDollars parses only cents correctly", () => {
  expect(parseDollars(".02")).toBe(2);
  expect(parseDollars(".1")).toBe(10);
  expect(parseDollars(".17")).toBe(17);
  expect(parseDollars("0.23")).toBe(23);
  expect(parseDollars("000.93")).toBe(93);
});

test("parseDollars parses dollars and cents together correctly", () => {
  expect(parseDollars("3.75")).toBe(375);
  expect(parseDollars("100.01")).toBe(10001);
  expect(parseDollars("4.9")).toBe(490);
  expect(parseDollars("103.78")).toBe(10378);
});

test("parseDollars handles invalid inputs correctly", () => {
  expect(parseDollars("-4")).toBe(null);
  expect(parseDollars("hello")).toBe(null);
  expect(parseDollars(".934")).toBe(null);
});

test("formatDollars formats correctly", () => {
  expect(formatDollars(0)).toBe("0.00");
  expect(formatDollars(1)).toBe("0.01");
  expect(formatDollars(10)).toBe("0.10");
  expect(formatDollars(100)).toBe("1.00");
  expect(formatDollars(101)).toBe("1.01");
  expect(formatDollars(110)).toBe("1.10");
  expect(formatDollars(1279)).toBe("12.79");
});

import { test, expect, describe } from "@jest/globals";
import { max, orderDescending, sumOfArray } from "./array-functions";

describe("sumOfArray", () => {
  test("Adds array values 1,2,3 to 6", () =>
    expect(sumOfArray([1, 2, 3])).toBe(6));
  test("With empty array returns 0", () => expect(sumOfArray([])).toBe(0));
});

describe("max", () => {
  test("From values 1,3,2 returns 3", () => expect(max([1, 3, 2])).toBe(3));
  test("With empty array returns 0", () => expect(max([])).toBe(0));
});

describe("orderDescending", () => {
  test("Orders [1,25,10] to [25,10,1]", () =>
    expect(orderDescending([1, 25, 10])).toStrictEqual([25, 10, 1]));
  test("With empty array to return empty array", () =>
    expect(orderDescending([])).toStrictEqual([]));
});

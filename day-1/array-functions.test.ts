import { test, expect, describe } from "@jest/globals";
import { max, orderByCalories, sumOfCalories } from "./array-functions";
import { Elf } from "./elf";

describe("sumOfCalories", () => {
  test("Adds elf calories 1,2,3 to 6", () => {
    expect(sumOfCalories(createElvesWithTotals([1, 2, 3]))).toBe(6);
  });
  test("With empty array returns 0", () => {
    expect(sumOfCalories([])).toBe(0);
  });
});

describe("max", () => {
  test("From values 1,3,2 returns 3", () => expect(max([1, 3, 2])).toBe(3));
  test("With empty array returns 0", () => expect(max([])).toBe(0));
});

describe("orderByCalories", () => {
  test("Orders [1,25,10] to [25,10,1]", () =>
    expect(orderByCalories(createElvesWithTotals([1, 25, 10]))).toStrictEqual(
      createElvesWithTotals([25, 10, 1])
    ));
  test("With empty array to return empty array", () =>
    expect(orderByCalories([])).toStrictEqual([]));
});

const createElvesWithTotals = (totals: number[]): Elf[] =>
  totals.map((total) => new Elf([total]));

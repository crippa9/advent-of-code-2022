import {
  orderByCalories,
  sumOfCalories,
  getElfWithMostCalories,
} from "./array-functions";
import { Elf } from "./elf";
import Puzzle from "../puzzle";

const elvesFromString = (textInput: string): Elf[] => {
  const lineSeparator = "\r\n";

  const stringsPerElf = textInput.split(`${lineSeparator}${lineSeparator}`);

  const elves: Elf[] = stringsPerElf.map(
    (caloriesPerElfString) =>
      new Elf(
        caloriesPerElfString
          .split(lineSeparator)
          .map((caloryString) => Number.parseInt(caloryString))
      )
  );
  return elves;
};

export default class Day1 extends Puzzle {
  constructor() {
    super(1);
  }
  solveFirstTest(): void {
    const inputString = this.readTestInput();
    const elves = elvesFromString(inputString);

    const elfWithMostCalories = getElfWithMostCalories(elves);

    console.log();
    console.log(
      "1 A. Total calories of elf with most calories: ",
      elfWithMostCalories.totalCalories()
    );
  }
  solveFirst(): void {
    const inputString = this.readInput();
    const elves = elvesFromString(inputString);

    const elfWithMostCalories = getElfWithMostCalories(elves);

    console.log();
    console.log(
      "1 A. Total calories of elf with most calories: ",
      elfWithMostCalories.totalCalories()
    );
  }
  solveSecondTest(): void {
    const inputString = this.readTestInput();

    const elves = elvesFromString(inputString);

    const elvesOrderedByCaloryCount = orderByCalories(elves);
    const topThree = elvesOrderedByCaloryCount.slice(0, 3);

    console.log();
    console.log(
      "1 B. Total calories of three elves with most calories: ",
      sumOfCalories(topThree)
    );
  }
  solveSecond(): void {
    const inputString = this.readInput();

    const elves = elvesFromString(inputString);

    const elvesOrderedByCaloryCount = orderByCalories(elves);
    const topThree = elvesOrderedByCaloryCount.slice(0, 3);

    console.log();
    console.log(
      "1 B. Total calories of three elves with most calories: ",
      sumOfCalories(topThree)
    );
  }
}

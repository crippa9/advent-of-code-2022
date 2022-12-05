import {
  orderByCalories,
  sumOfCalories,
  getElfWithMostCalories,
} from "./array-functions";
import { Elf } from "./elf";
import Puzzle from "../puzzle";

export default class Day1 extends Puzzle {
  constructor() {
    super(1);
  }
  solveFirstTest(): void {
    const inputString = this.readTestInput();
    solveFirstWithInput(inputString);
  }
  solveFirst(): void {
    const inputString = this.readInput();
    solveFirstWithInput(inputString);
  }
  solveSecondTest(): void {
    const inputString = this.readTestInput();
    solveSecondWithInput(inputString);
  }
  solveSecond(): void {
    const inputString = this.readInput();
    solveSecondWithInput(inputString);
  }
}

const solveFirstWithInput = (data: string) => {
  const elves = elvesFromString(data);

  const elfWithMostCalories = getElfWithMostCalories(elves);

  console.log(
    "1A. Total calories of elf with most calories: ",
    elfWithMostCalories.totalCalories()
  );
}
const solveSecondWithInput = (data: string) => {
  const elves = elvesFromString(data);

  const elvesOrderedByCaloryCount = orderByCalories(elves);
  const topThree = elvesOrderedByCaloryCount.slice(0, 3);

  console.log(
    "1B. Total calories of three elves with most calories: ",
    sumOfCalories(topThree)
  );
}

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
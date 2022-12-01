import { readFileSync } from "fs";
import { max, orderDescending, sumOfArray } from "./array-functions";

const LineSeparator = "\r\n";

const readFileAsString = (): string => {
  console.log("Parsing input from file...");
  const path = "./input.txt";

  return readFileSync(path, "utf8");
};
const getCaloriesPerElf = (textInput: string): number[] => {
  const stringsPerElf = textInput.split(`${LineSeparator}${LineSeparator}`);
  console.log("Number of elves: ", stringsPerElf.length);

  const caloriesPerElf: number[][] = stringsPerElf.map((caloriesPerElfString) =>
    caloriesPerElfString
      .split(LineSeparator)
      .map((caloryString) => Number.parseInt(caloryString))
  );
  const totalCaloriesPerElf: number[] = caloriesPerElf.map(sumOfArray);

  return totalCaloriesPerElf;
};

const parsedInput = readFileAsString();

const totalCaloriesPerElf = getCaloriesPerElf(parsedInput);

const caloriesOfElfWithMostCalories = max(totalCaloriesPerElf);

const elvesOrderedByCaloryCount = orderDescending(totalCaloriesPerElf);
const topThree = elvesOrderedByCaloryCount.slice(0, 3);
const topThreeTotalCalories = sumOfArray(topThree);

console.log();
console.log(
  "1 A. Total calories of elf with most calories: ",
  caloriesOfElfWithMostCalories
);
console.log(
  "1 B. Total calories of three elves with most calories: ",
  topThreeTotalCalories
);

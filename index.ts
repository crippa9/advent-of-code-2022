import { max, orderDescending, sumOfArray } from "./array-functions";
import { readFileAsString } from "./file-reader";

const getCaloriesPerElf = (textInput: string): number[] => {
  const lineSeparator = "\r\n";

  const stringsPerElf = textInput.split(`${lineSeparator}${lineSeparator}`);
  console.log("Number of elves: ", stringsPerElf.length);

  const caloriesPerElf: number[][] = stringsPerElf.map((caloriesPerElfString) =>
    caloriesPerElfString
      .split(lineSeparator)
      .map((caloryString) => Number.parseInt(caloryString))
  );
  const totalCaloriesPerElf: number[] = caloriesPerElf.map(sumOfArray);

  return totalCaloriesPerElf;
};

const inputString = readFileAsString();

const totalCaloriesPerElf = getCaloriesPerElf(inputString);

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

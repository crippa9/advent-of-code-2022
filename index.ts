import { orderByCalories, sumOfCalories, getElfWithMostCalories } from "./array-functions";
import { Elf } from "./elf";
import { readFileAsString } from "./file-reader";

const elvesFromString = (textInput: string): Elf[] => {
  const lineSeparator = "\r\n";

  const stringsPerElf = textInput.split(`${lineSeparator}${lineSeparator}`);
  console.log("Number of elves: ", stringsPerElf.length);

  const elves: Elf[] = stringsPerElf.map((caloriesPerElfString) =>
    new Elf(
      caloriesPerElfString
        .split(lineSeparator)
        .map((caloryString) => Number.parseInt(caloryString))
    )
  );
  return elves;
};

const inputString = readFileAsString();

const elves = elvesFromString(inputString);

const elfWithMostCalories = getElfWithMostCalories(elves);

const elvesOrderedByCaloryCount = orderByCalories(elves);
const topThree = elvesOrderedByCaloryCount.slice(0, 3);

console.log();
console.log(
  "1 A. Total calories of elf with most calories: ",
  elfWithMostCalories.totalCalories()
);
console.log(
  "1 B. Total calories of three elves with most calories: ",
  sumOfCalories(topThree)
);


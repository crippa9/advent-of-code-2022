import { readFileSync } from 'fs';

const readFileAsString = (): string => {
  console.log("Parsing input from file...");
  const path = "./input.txt";

  return readFileSync(path, 'utf8');
};
const getCaloriesPerElf = (textInput: string): number[] => {
  const stringsPerElf = textInput.split("\r\n\r\n");
  console.log("Number of elves: ", stringsPerElf.length);
  const caloriesPerElf: number[][] = stringsPerElf.map(
    caloriesPerElfString => caloriesPerElfString
      .split("\r\n")
      .map((caloryString) => Number.parseInt(caloryString))
  );
  const totalCaloriesPerElf: number[] = caloriesPerElf.map(sumOfArray);

  return totalCaloriesPerElf;
};
const sumOfArray = (calories: number[]): number => calories.reduce((sum, current) => current + sum, 0);
const max = (input: number[]): number => input.reduce((maxValue, currentValue) => currentValue > maxValue ? currentValue : maxValue, 0);
const orderDescending = (input: number[]): number[] => input.sort((a, b) => b - a);

const parsedInput = readFileAsString();

const totalCaloriesPerElf = getCaloriesPerElf(parsedInput);
const elfsOrderdByCaloryCount = orderDescending(totalCaloriesPerElf);

const caloriesOfElfWithMostCalories = max(totalCaloriesPerElf);

const topThree = elfsOrderdByCaloryCount.slice(0, 3);
const topThreeTotalCalories = sumOfArray(topThree);

console.log();
console.log('1 A. Total calories of elf with most calories: ', caloriesOfElfWithMostCalories);
console.log('1 B. Total calories of three elves with most calories: ', topThreeTotalCalories);
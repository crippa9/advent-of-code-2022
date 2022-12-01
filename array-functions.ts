import { Elf } from "./elf";

export const sumOfCalories = (elves: Elf[]): number =>
  elves.reduce((sum, current) => current.totalCalories() + sum, 0);

export const max = (input: number[]): number =>
  input.reduce(
    (maxValue, currentValue) =>
      currentValue > maxValue ? currentValue : maxValue,
    0
  );

export const getElfWithMostCalories = (elves: Elf[]): Elf => {
  const elfWithMostCalories = elves.reduce<Elf | undefined>(
    (leader, currentElf) =>
      leader && leader.totalCalories() > currentElf.totalCalories()
        ? leader
        : currentElf,
    undefined
  );
  if (!elfWithMostCalories) throw new Error('Not able to get elf with most calories');
  return elfWithMostCalories;
}

export const orderByCalories = (elves: Elf[]): Elf[] =>
  elves.sort((a, b) => b.totalCalories() - a.totalCalories());

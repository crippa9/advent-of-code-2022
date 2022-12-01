export const sumOfArray = (calories: number[]): number =>
  calories.reduce((sum, current) => current + sum, 0);

export const max = (input: number[]): number =>
  input.reduce(
    (maxValue, currentValue) =>
      currentValue > maxValue ? currentValue : maxValue,
    0
  );

export const orderDescending = (input: number[]): number[] =>
  input.sort((a, b) => b - a);

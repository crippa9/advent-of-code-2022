export class Elf {
  private calories: number[];
  /**
   * An elf carrying snacks
   */
  constructor(calories: number[]) {
    this.calories = calories;
  }

  totalCalories(): number {
    return this.calories.reduce((sum, current) => current + sum, 0);
  }
}

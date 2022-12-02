import { readFileSync } from "fs";

export default abstract class Puzzle {
  private day: number;

  abstract solveFirstTest(): void;
  abstract solveFirst(): void;
  abstract solveSecondTest(): void;
  abstract solveSecond(): void;

  constructor(day: number) {
    this.day = day;
  }

  protected readInput(): string {
    return readFileSync(`day-${this.day}/input.txt`, "utf-8");
  }
  protected readTestInput(): string {
    return readFileSync(`day-${this.day}/input-test.txt`, "utf-8");
  }
}

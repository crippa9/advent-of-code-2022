import { readFileSync } from "fs";

export default abstract class Puzzle {
  private day: number;

  solveFirstTest(): void {
    const data = this.readTestInput();
    this.solveFirstImplementation(data);
  }
  solveFirst(): void {
    const data = this.readInput();
    this.solveFirstImplementation(data);
  }
  solveSecondTest(): void {
    const data = this.readInput();
    this.solveSecondImplementation(data);
  }
  solveSecond(): void {
    const data = this.readTestInput();
    this.solveSecondImplementation(data);
  }
  abstract solveFirstImplementation(data: string): void;
  abstract solveSecondImplementation(data: string): void;

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

import { readFileSync } from "fs";

export default abstract class Puzzle {
  abstract solveFirstTest(): void;
  abstract solveFirst(): void;
  abstract solveSecondTest(): void;
  abstract solveSecond(): void;

  protected readInput(path: string): string {
    return readFileSync(path, "utf-8");
  }
}

import Puzzle from "../puzzle";

export default class Day5 extends Puzzle {
  constructor() {
    super(5);
  }
  solveFirstImplementation(data: string): void {
    solveFirstWithInput(data);
  }
  solveSecondImplementation(data: string): void {
    solveSecondWithInput(data);
  }
}

const solveFirstWithInput = (data: string) => {
  const [startingStacksString, instructionsString] = data.split("\r\n\r\n");
  const stacks = parseStacks(startingStacksString);

  const instructions = instructionsString.split("\r\n");
  instructions.forEach((instruction) => {
    let [remainingToMove, sourceIndex, targetIndex] =
      extractInstructions(instruction);
    while (remainingToMove > 0) {
      const elementToMove = stacks[sourceIndex].grabFromTop(1);
      stacks[targetIndex].addToTop(elementToMove);
      remainingToMove--;
    }
  });
  console.log(
    "5A. Top letters in each stack",
    stacks.map((s) => s.grabFromTop(1)).join("")
  );
};

const solveSecondWithInput = (data: string) => {
  const [startingStacksString, instructionsString] = data.split("\r\n\r\n");
  const stacks = parseStacks(startingStacksString);

  const instructions = instructionsString.split("\r\n");
  instructions.forEach((instruction) => {
    const [numberToMove, sourceIndex, targetIndex] =
      extractInstructions(instruction);
    const elementToMove = stacks[sourceIndex].grabFromTop(numberToMove);
    stacks[targetIndex].addToTop(elementToMove);
  });
  console.log(
    "5B. Top letters in each stack",
    stacks.map((s) => s.grabFromTop(1)).join("")
  );
};

const parseStacks = (startingStacksString: string): Stack<string>[] => {
  const rows = startingStacksString.split("\r\n");
  const arrays: string[][] = [];
  for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
    const row = rows[rowIndex];
    for (
      let columnIndex = 0;
      columnIndex < (row.length + 1) / 4;
      columnIndex++
    ) {
      const stringIndex = columnIndex * 4 + 1;
      const element = row[stringIndex];
      if (element !== " ") {
        arrays[columnIndex] = [element, ...(arrays[columnIndex] ?? [])];
      }
    }
  }
  const stacks: Stack<string>[] = arrays.map((array) => new Stack(array));
  return stacks;
};

const extractInstructions = (row: string): [number, number, number] => {
  const matches = row.match(/move (\d+) from (\d+) to (\d+)/);
  if (!matches) throw new Error("Could not parse instruction");
  return [
    Number.parseInt(matches[1]),
    Number.parseInt(matches[2]) - 1,
    Number.parseInt(matches[3]) - 1,
  ];
};

class Stack<T> {
  elements: T[];

  constructor(initialData: T[]) {
    this.elements = initialData;
  }
  addToTop(elements: T[]): void {
    this.elements = [...this.elements, ...elements];
  }
  grabFromTop(quantityToGrab: number): T[] {
    return this.elements.splice(-quantityToGrab, quantityToGrab);
  }
}

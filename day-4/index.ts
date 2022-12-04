import Puzzle from "../puzzle";

export default class Day4 extends Puzzle {
  constructor() {
    super(4);
  }
  solveFirstTest(): void {
    const data = this.readTestInput();
    solveFirstWithInput(data);
  }
  solveFirst(): void {
    const data = this.readInput();
    solveFirstWithInput(data);
  }
  solveSecondTest(): void {
    const data = this.readTestInput();
    solveSecondWithInput(data);
  }
  solveSecond(): void {
    const data = this.readInput();
    solveSecondWithInput(data);
  }
}

const solveFirstWithInput = (data: string) => {
  const pairs = parsePairAssignments(data);
  const pairsWithFullContainment = pairs.reduce(
    (counter, pair) => (oneFullyContainsOther(pair) ? counter + 1 : counter),
    0
  );

  console.log(
    "4 A. Assignment pairs where one range fully contains the other",
    pairsWithFullContainment
  );
};

const solveSecondWithInput = (data: string) => {
  const pairs = parsePairAssignments(data);
  const pairsWithPartialContainment = pairs.reduce(
    (counter, pair) =>
      onePartiallyContainsOther(pair) ? counter + 1 : counter,
    0
  );

  console.log("4 B. Assignment pairs with partial overlap", pairsWithPartialContainment);
};

const parsePairAssignments = (data: string): Assignment[][] =>
  data.split("\r\n").map((p) => {
    const assignments: Assignment[] = p.split(",").map<Assignment>((a) => {
      const match = a.match(/\d+/g);
      if (!match) throw new Error("Could not parse assignment");
      return {
        from: Number.parseInt(match[0]),
        to: Number.parseInt(match[1]),
      };
    });
    return assignments;
  });

const oneFullyContainsOther = ([first, second]: Assignment[]): boolean =>
  (first.from <= second.from && first.to >= second.to) ||
  (second.from <= first.from && second.to >= first.to);

const onePartiallyContainsOther = ([first, second]: Assignment[]): boolean =>
  (first.to >= second.from && first.to <= second.to) ||
  (second.to >= first.from && second.to <= first.to);

type Assignment = {
  from: number;
  to: number;
};

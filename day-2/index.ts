import Puzzle from "../puzzle";

const mapOpponentAndMyMoveRoundsFromInput = (input: string) =>
  input.split("\r\n").map((round): [OpponentMove, MyMove] => {
    const roundArray = round.split(" ");
    const opponentMove = roundArray[0] as OpponentMove;
    const myMove = roundArray[1] as MyMove;
    return [opponentMove, myMove];
  });
  
const mapOpponentAndWantedOutcomeRoundsFromInput = (input: string) =>
input.split("\r\n").map((round): [OpponentMove, WantedOutcome] => {
  const roundArray = round.split(" ");
  const opponentMove = roundArray[0] as OpponentMove;
  const wantedOutcome = roundArray[1] as WantedOutcome;
  return [opponentMove, wantedOutcome];
});
export default class Day2 extends Puzzle {
  constructor() {
    super(2);
  }
  solveFirstTest(): void {
    const data = this.readTestInput();
    const rounds = mapOpponentAndMyMoveRoundsFromInput(data);
    this.solveFirstWithInput(rounds);
  }
  solveFirst(): void {
    const data = this.readInput();
    const rounds = mapOpponentAndMyMoveRoundsFromInput(data);
    this.solveFirstWithInput(rounds);
  }
  solveSecondTest(): void {
    const data = this.readTestInput();
    const rounds = mapOpponentAndWantedOutcomeRoundsFromInput(data);
    this.solveSecondWithInput(rounds);
  }
  solveSecond(): void {
    const data = this.readInput();
    const rounds = mapOpponentAndWantedOutcomeRoundsFromInput(data);
    this.solveSecondWithInput(rounds);
  }
  private solveSecondWithInput(rounds: [OpponentMove, WantedOutcome][]) {
    const roundResults = rounds.map((round) => {
      const [opponentMove] = round;

      const myMove = calculateMoveForRound(round);
      const moveScore = calculatePointsForMove(myMove);
      const playScore = calculatePointsForRound(opponentMove, myMove);
      const roundScore = moveScore + playScore;

      return roundScore;
    });
    console.log(
      "2 B. Total score:",
      roundResults.reduce((aggr, curr) => curr + aggr, 0)
    );
  }

  private solveFirstWithInput(rounds: [OpponentMove, MyMove][]): void {
    const roundResults = rounds.map(([opponentMove, myMove]) => {
      const moveScore = calculatePointsForMove(myMove);
      const playScore = calculatePointsForRound(opponentMove, myMove);
      const roundScore = moveScore + playScore;

      return roundScore;
    });
    console.log(
      "2 A. Total score:",
      roundResults.reduce((aggr, curr) => curr + aggr, 0)
    );
  }
}

function calculateMoveForRound(round: [OpponentMove, WantedOutcome]): MyMove {
  const [opponentMove, wantedOutcome] = round;
  if (opponentMove === OpponentMove.Rock) {
    switch (wantedOutcome) {
      case WantedOutcome.Win:
        return MyMove.Paper;
      case WantedOutcome.Draw:
        return MyMove.Rock;
      case WantedOutcome.Loss:
        return MyMove.Scissor;
    }
  }
  if (opponentMove === OpponentMove.Paper) {
    switch (wantedOutcome) {
      case WantedOutcome.Win:
        return MyMove.Scissor;
      case WantedOutcome.Draw:
        return MyMove.Paper;
      case WantedOutcome.Loss:
        return MyMove.Rock;
    }
  }
  if (opponentMove === OpponentMove.Scissor) {
    switch (wantedOutcome) {
      case WantedOutcome.Win:
        return MyMove.Rock;
      case WantedOutcome.Draw:
        return MyMove.Scissor;
      case WantedOutcome.Loss:
        return MyMove.Paper;
    }
  }
  throw new Error("Invalid state");
}

function calculatePointsForMove(move: MyMove): number {
  switch (move) {
    case MyMove.Rock:
      return 1;
    case MyMove.Paper:
      return 2;
    case MyMove.Scissor:
      return 3;
  }
}

function calculatePointsForRound(
  opponentMove: OpponentMove,
  myMove: MyMove
): number {
  if (myMove === MyMove.Rock) {
    switch (opponentMove) {
      case OpponentMove.Rock:
        return 3;
      case OpponentMove.Paper:
        return 0;
      case OpponentMove.Scissor:
        return 6;
    }
  }
  if (myMove === MyMove.Paper) {
    switch (opponentMove) {
      case OpponentMove.Rock:
        return 6;
      case OpponentMove.Paper:
        return 3;
      case OpponentMove.Scissor:
        return 0;
    }
  }
  if (myMove === MyMove.Scissor) {
    switch (opponentMove) {
      case OpponentMove.Rock:
        return 0;
      case OpponentMove.Paper:
        return 6;
      case OpponentMove.Scissor:
        return 3;
    }
  }
  throw new Error("Invalid input");
}

enum WantedOutcome {
  Loss = "X",
  Draw = "Y",
  Win = "Z",
}
enum MyMove {
  Rock = "X",
  Paper = "Y",
  Scissor = "Z",
}
enum OpponentMove {
  Rock = "A",
  Paper = "B",
  Scissor = "C",
}

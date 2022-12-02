import Puzzle from "../puzzle";

export default class Day2 extends Puzzle {
  solveFirstTest(): void {
    const data = this.readInput("day-2/input-test.txt");
    const rounds = data
      .split("\r\n")
      .map(round => {
        const roundArray = round.split(" ");
        const opponentMove = roundArray[0] as OpponentMove;
        const myMove = roundArray[1] as MyMove;
        return [opponentMove, myMove];
      });
    this.solveFirstWithInput(rounds);
  }
  solveFirst(): void {
    const data = this.readInput("day-2/input.txt");
    const rounds = data
      .split("\r\n")
      .map(round => {
        const roundArray = round.split(" ");
        const opponentMove = roundArray[0] as OpponentMove;
        const myMove = roundArray[1] as MyMove;
        return [opponentMove, myMove];
      });
    this.solveFirstWithInput(rounds);
  }
  solveSecondTest(): void {
    const data = this.readInput("day-2/input-test.txt");
    const rounds = data
      .split("\r\n")
      .map((round): [OpponentMove, WantedOutcome] => {
        const roundArray = round.split(" ");
        const opponentMove = roundArray[0] as OpponentMove;
        const outcome = roundArray[1] as WantedOutcome;
        return [opponentMove, outcome];
      });
    this.solveSecondWithInput(rounds);
  }
  solveSecond(): void {
    const data = this.readInput("day-2/input.txt");
    const rounds = data
      .split("\r\n")
      .map((round): [OpponentMove, WantedOutcome] => {
        const roundArray = round.split(" ");
        const opponentMove = roundArray[0] as OpponentMove;
        const outcome = roundArray[1] as WantedOutcome;
        return [opponentMove, outcome];
      });
    this.solveSecondWithInput(rounds);
  }
  private solveSecondWithInput(rounds: [OpponentMove, WantedOutcome][]) {
    const roundResults = rounds.map((round, index) => {
      const [opponentMove, wantedOutcome] = round;
      // console.log("Round ", index);
      // console.log(round);
      const myMove = this.getMoveForRound(round);

      const moveScore = this.getPointsForMove(myMove);
      const playScore = this.getPointsForRound(opponentMove, myMove);
      const roundScore = moveScore + playScore;

      // console.log("Move score ", this.getPointsForMove(myMove));
      // console.log("Play score ", this.getPointsForRound(opponentMove, myMove));

      return roundScore;
    });
    console.log("Total score", roundResults.reduce((aggr, curr) => curr + aggr, 0))
  }
  getMoveForRound(round: [OpponentMove, WantedOutcome]): MyMove {
    const [opponentMove, wantedOutcome] = round;
    if (opponentMove === OpponentMove.Rock) {
      switch (wantedOutcome) {
        case WantedOutcome.Win: return MyMove.Paper;
        case WantedOutcome.Draw: return MyMove.Rock;
        case WantedOutcome.Loss: return MyMove.Scissor;
      }
    }
    if (opponentMove === OpponentMove.Paper) {
      switch (wantedOutcome) {
        case WantedOutcome.Win: return MyMove.Scissor;
        case WantedOutcome.Draw: return MyMove.Paper;
        case WantedOutcome.Loss: return MyMove.Rock;
      }
    }
    if (opponentMove === OpponentMove.Scissor) {
      switch (wantedOutcome) {
        case WantedOutcome.Win: return MyMove.Rock;
        case WantedOutcome.Draw: return MyMove.Scissor;
        case WantedOutcome.Loss: return MyMove.Paper;
      }
    }
    throw new Error("Invalid state");
  }

  private getPointsForMove(move: MyMove): number {
    switch (move) {
      case MyMove.Rock: return 1;
      case MyMove.Paper: return 2;
      case MyMove.Scissor: return 3;
    }
  }

  private getPointsForRound(opponentMove: OpponentMove, myMove: MyMove): number {
    if (myMove === MyMove.Rock) {
      switch (opponentMove) {
        case OpponentMove.Rock: return 3;
        case OpponentMove.Paper: return 0;
        case OpponentMove.Scissor: return 6;
      }
    }
    if (myMove === MyMove.Paper) {
      switch (opponentMove) {
        case OpponentMove.Rock: return 6;
        case OpponentMove.Paper: return 3;
        case OpponentMove.Scissor: return 0;
      }
    }
    if (myMove === MyMove.Scissor) {
      switch (opponentMove) {
        case OpponentMove.Rock: return 0;
        case OpponentMove.Paper: return 6;
        case OpponentMove.Scissor: return 3;
      }
    }
    throw new Error("Invalid input");
  }

  private solveFirstWithInput(rounds: (OpponentMove | MyMove)[][]): void {
    const roundResults = rounds.map((round, index) => {
      const opponentMove = round[0] as OpponentMove;
      const myMove = round[1] as MyMove;
      // console.log("Round ", index);
      // console.log(round);

      const moveScore = this.getPointsForMove(myMove);
      const playScore = this.getPointsForRound(opponentMove, myMove);
      const roundScore = moveScore + playScore;

      // console.log("Move score ", this.getPointsForMove(myMove));
      // console.log("Play score ", this.getPointsForRound(opponentMove, myMove));

      return roundScore;
    });
    console.log("Total score", roundResults.reduce((aggr, curr) => curr + aggr, 0))
  }
}

enum WantedOutcome {
  Loss = "X",
  Draw = "Y",
  Win = "Z"
}
enum MyMove {
  Rock = "X",
  Paper = "Y",
  Scissor = "Z"
}
enum OpponentMove {
  Rock = "A",
  Paper = "B",
  Scissor = "C"
}

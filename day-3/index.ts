import Puzzle from "../puzzle";

export default class Day3 extends Puzzle {
  constructor() {
    super(3);
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
  const rucksacks = data.split("\r\n");

  const sharedItems = rucksacks.flatMap((rucksack) => {
    const compartmentSize = rucksack.length * 0.5;
    const firstCompartment = rucksack.slice(0, compartmentSize);
    const secondCompartment = rucksack.slice(compartmentSize, rucksack.length);

    const itemsInBothCompartments = new Set<string>();
    for (let index = 0; index < firstCompartment.length; index++) {
      const item = firstCompartment[index];
      if (secondCompartment.includes(item)) {
        itemsInBothCompartments.add(item);
      }
    }
    return Array.from(itemsInBothCompartments);
  });
  const prioritySum = sharedItems.reduce(
    (sum, item) => sum + characterPriority(item),
    0
  );

  console.log("3 A. Sum of priorities", prioritySum);
};

const solveSecondWithInput = (data: string) => {
  const rucksacks = data.split("\r\n");

  let groups: string[][] = [];
  for (let index = 0; index < rucksacks.length; index += 3) {
    groups.push([rucksacks[index], rucksacks[index + 1], rucksacks[index + 2]]);
  }

  const badgeCharacters = groups.map((group) => {
    const [first, second, third] = group;
    for (let index = 0; index < first.length; index++) {
      const item = first[index];
      if (second.includes(item) && third.includes(item)) {
        return item;
      }
    }
    throw new Error("No badge found");
  });
  const badgePrioritySum = badgeCharacters.reduce(
    (sum, badgeCharacter) => sum + characterPriority(badgeCharacter),
    0
  );

  console.log("3 B. Sum of badge priorisies", badgePrioritySum);
};

const characterPriority = (character: string): number => {
  const charCode = character.charCodeAt(0);
  const lowercaseCharacter = charCode > 96;
  if (lowercaseCharacter) {
    return charCode - 96;
  }
  return charCode - 38;
};

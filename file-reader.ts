import { readFileSync } from "fs";

export const readFileAsString = (): string => {
  console.log("Parsing input from file...");
  const path = "./input.txt";

  return readFileSync(path, "utf8");
};
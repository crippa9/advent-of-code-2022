import Puzzle from "../puzzle";

export default class Day6 extends Puzzle {
  constructor() {
    super(6);
  }
  solveFirstImplementation(data: string): void {
    solveFirstWithInput(data);
  }
  solveSecondImplementation(data: string): void {
    solveSecondWithInput(data);
  }
}

interface FileSystemNode {
  name: string;
  type: "file" | "dir";
  size(): number;
}
class File implements FileSystemNode {
  name: string;
  type: "file" | "dir";
  private sizeField: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.sizeField = size;
    this.type = "file";
  }
  
  size(): number {
    return this.sizeField;
  }

}
class Directory implements FileSystemNode {
  name: string;
  type: "file" | "dir";
  children: FileSystemNode[];

  constructor(name: string) {
    this.name = name;
    this.type = "dir";
    this.children = [];
  }
  size() {
    return this.children.reduce((sum, child) => sum+child.size(), 0);
  };
}

const CommandMatchRegex = /^\$ (\w+)[\ ]*(.*)$/;

const solveFirstWithInput = (data: string) => {
  let location: string[] = [];
  const fileSystem: {[fullPath: string]: FileSystemNode} = {};
  
  const rows = data.split("\r\n");
  let [firstRow, ...remainingRows] = rows;
  
  const commandMatch = firstRow.match(CommandMatchRegex);
  if (!commandMatch) {
    throw new Error("Invalid start of input. No start directory command");
  }
  location.push("");
  const rootDirectory = new Directory("/");
  fileSystem[""] = rootDirectory;
  let currentDirectory: Directory = rootDirectory;

  while (remainingRows.length) {
    const currentRow = remainingRows[0];
    const commandMatch = currentRow.match(CommandMatchRegex);
    if (commandMatch) {
      const [_, command, parameter] = commandMatch;
      switch (command) {
        case "cd": {
          if (parameter === "..") {
            location.pop();
            currentDirectory = fileSystem[fileSystemKeyFromLocation(location)] as Directory;
            remainingRows = remainingRows.slice(1);
            continue;
          }
          location.push(parameter);
          currentDirectory = fileSystem[fileSystemKeyFromLocation(location)] as Directory;
          remainingRows = remainingRows.slice(1);
          continue;
        }
        case "ls": {
          const directoryContents = findDirectoryContents(remainingRows.slice(1));
          directoryContents.forEach((node) => {
            const directoryMatch = node.match(/^dir (\w+)/);
            const fileMatch = node.match(/^([0-9]+) (.*)/);
            if (directoryMatch) {
              const directory = new Directory(directoryMatch[1]);
              currentDirectory.children.push(directory);
              fileSystem[
                fileSystemKeyFromLocation([...location, directoryMatch[1]])
              ] = directory;
            }
            else if (fileMatch) {
              currentDirectory.children.push(new File(fileMatch[2], Number.parseInt(fileMatch[1])));
            }
            else {
              throw new Error("Invalid directory content");
            }
          });
          remainingRows = remainingRows.slice(1 + directoryContents.length);
          continue;
        }
      }
      remainingRows = remainingRows.slice(1);
      continue;
    }
    throw new Error("Row not working");
  }

  // console.log(fileSystem);
  const threshold = 100000;
  const directoriesBelowThreshold: [string, number][] = [];
  for (const key in fileSystem) {
    if (Object.prototype.hasOwnProperty.call(fileSystem, key)) {
      const node = fileSystem[key] as Directory;
      // console.log(node, node.size());
      if (node.size() < threshold) {
        directoriesBelowThreshold.push([node.name, node.size()]);
      }
    }
  }
  // console.log(directoriesBelowThreshold);
  console.log("6A. Sum of sizes for directories below threshold", directoriesBelowThreshold.reduce((sum, curr) => sum+curr[1], 0));
}

const solveSecondWithInput = (data: string) => {
  let location: string[] = [];
  const fileSystem: {[fullPath: string]: FileSystemNode} = {};
  
  const rows = data.split("\r\n");
  let [firstRow, ...remainingRows] = rows;
  
  const commandMatch = firstRow.match(CommandMatchRegex);
  if (!commandMatch) {
    throw new Error("Invalid start of input. No start directory command");
  }
  location.push("");
  const rootDirectory = new Directory("/");
  fileSystem[""] = rootDirectory;
  let currentDirectory: Directory = rootDirectory;

  while (remainingRows.length) {
    const currentRow = remainingRows[0];
    const commandMatch = currentRow.match(CommandMatchRegex);
    if (commandMatch) {
      const [_, command, parameter] = commandMatch;
      switch (command) {
        case "cd": {
          if (parameter === "..") {
            location.pop();
            currentDirectory = fileSystem[fileSystemKeyFromLocation(location)] as Directory;
            remainingRows = remainingRows.slice(1);
            continue;
          }
          location.push(parameter);
          currentDirectory = fileSystem[fileSystemKeyFromLocation(location)] as Directory;
          remainingRows = remainingRows.slice(1);
          continue;
        }
        case "ls": {
          const directoryContents = findDirectoryContents(remainingRows.slice(1));
          directoryContents.forEach((node) => {
            const directoryMatch = node.match(/^dir (\w+)/);
            const fileMatch = node.match(/^([0-9]+) (.*)/);
            if (directoryMatch) {
              const directory = new Directory(directoryMatch[1]);
              currentDirectory.children.push(directory);
              fileSystem[
                fileSystemKeyFromLocation([...location, directoryMatch[1]])
              ] = directory;
            }
            else if (fileMatch) {
              currentDirectory.children.push(new File(fileMatch[2], Number.parseInt(fileMatch[1])));
            }
            else {
              throw new Error("Invalid directory content");
            }
          });
          remainingRows = remainingRows.slice(1 + directoryContents.length);
          continue;
        }
      }
      remainingRows = remainingRows.slice(1);
      continue;
    }
    throw new Error("Row not working");
  }

  const threshold = 8381165;
  // select directory with smallest size above threshold
  const directoriesAboveThreshold: [string, number][] = [];
  for (const key in fileSystem) {
    if (Object.prototype.hasOwnProperty.call(fileSystem, key)) {
      const node = fileSystem[key];
      const size = node.size();
      if (size >= threshold) {
        directoriesAboveThreshold.push([key, size]);
      }
    }
  }
  // (fileSystem["/jvwtm"] as Directory).children.forEach(rootChild => {
  //   if (rootChild.size() >= threshold) {
  //     console.log(rootChild, rootChild.size());
  //     directoriesAboveThreshold.push([rootChild.name, rootChild.size()]);
  //   }
  // });
  console.log(directoriesAboveThreshold);
  console.log("6B. Smallest applicable folder size", Math.min(...directoriesAboveThreshold.map(d => d[1])));
}

const fileSystemKeyFromLocation = (location: string[]): string => location.join("/");

const findDirectoryContents = (rows: string[]): string[] => {
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const commandMatch = row.match(CommandMatchRegex);
    if (commandMatch) {
      return rows.slice(0, index);
    }
  }
  return rows;
}
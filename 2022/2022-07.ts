import { G } from "../common/guard.ts";
import { SORT } from "../common/sort.ts";
import { M } from "../common/math.ts";

type FileMap = Record<string, Record<string, number>>;

type ParsedLine =
  | { type: "FILE"; name: string; size: number }
  | { type: "CHANGE_DIR"; name: string }
  | { type: "CHANGE_DIR_PARENT" };

function parseLine(line: string): ParsedLine | undefined {
  const args = line.split(" ");
  if (line.startsWith("$ cd ")) {
    return args[2] === ".."
      ? { type: "CHANGE_DIR_PARENT" }
      : { type: "CHANGE_DIR", name: args[2] };
  }
  if (G.isNumeric(args[0])) {
    return { type: "FILE", name: args[1], size: parseInt(args[0]) };
  }
}

function inputToFileMap(input: string): FileMap {
  const path: string[] = [];
  const dirs: FileMap = {};

  input.split("\n").map(parseLine).filter(G.isTruthy).forEach((line) => {
    const key = path.join("/");
    if (!dirs[key]) dirs[key] = {};

    switch (line.type) {
      case "CHANGE_DIR":
        path.push(line.name);
        break;
      case "CHANGE_DIR_PARENT":
        path.pop();
        break;
      case "FILE":
        dirs[key][line.name] = line.size;
        break;
    }
  });
  return dirs;
}

function getDirSize(fileMap: FileMap, path: string): number {
  return M.sum(
    Object.entries(fileMap)
      .filter(([key]) => key.includes(path))
      .map(([_, files]) => M.sum(Object.values(files))),
  );
}

function getDirSizes(dirs: FileMap): Record<string, number> {
  return Object.fromEntries(
    Object.keys(dirs).map((dir) => [
      dir,
      getDirSize(dirs, dir),
    ]),
  );
}

export function part1(input: string) {
  const dirs = inputToFileMap(input);
  const sizes = Object.values(getDirSizes(dirs));
  return M.sum(sizes.filter((size) => size <= 100_000));
}

export function part2(input: string) {
  const dirs = inputToFileMap(input);
  const dirSizeRec = getDirSizes(dirs);

  const diskSpace = 70_000_000;
  const updateSize = 30_000_000;
  const availableSpace = diskSpace - dirSizeRec["/"];
  const extraSpaceNeeded = updateSize - availableSpace;

  return Object.values(dirSizeRec)
    .filter((size) => size >= extraSpaceNeeded)
    .sort(SORT.ascending)[0];
}

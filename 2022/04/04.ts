type Pair = [[number, number], [number, number]];

function parsePairs(input: string) {
  return input
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((vals) => vals.split("-").map((n) => parseInt(n)))
    ) as Pair[];
}

const fullOverlap = ([a, b]: Pair): boolean =>
  (a[0] <= b[0] && a[1] >= b[1]) ||
  (b[0] <= a[0] && b[1] >= a[1]);

export const part1 = (input: string) =>
  parsePairs(input).filter(fullOverlap).length;

const partialOverlap = ([a, b]: Pair): boolean =>
  b[0] < a[0] ? b[1] >= a[0] : b[0] <= a[1];

export const part2 = (input: string) =>
  parsePairs(input).filter(partialOverlap).length;

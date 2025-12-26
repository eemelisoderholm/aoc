import { S } from "../common/string.ts";

const hasCount = (charCounts: Record<string, number>, target: number) =>
  Object.entries(charCounts).some(([_, count]) => count === target);

// Multiply the number of ids with double and triple characters
function checksum(boxIds: string[]): number {
  const boxCharCounts = boxIds.map(S.charCounts);
  const doubles = boxCharCounts.filter((counts) => hasCount(counts, 2));
  const triples = boxCharCounts.filter((counts) => hasCount(counts, 3));
  return doubles.length * triples.length;
}

const getCommonChars = (a: string, b: string): string =>
  a.split("").filter((c, i) => c === b[i]).join("");

function findSingleDiffCommonChars(boxIds: string[]) {
  for (let i = 0; i < boxIds.length; i++) {
    for (let j = 0; j < boxIds.length; j++) {
      if (i === j) continue;
      const common = getCommonChars(boxIds[i], boxIds[j]);
      if (common.length === boxIds[i].length - 1) return common;
    }
  }
  return "";
}

// Find the checksum for a list of boxids
export function part1(input: string): number {
  const boxIds = input.split("\n");
  return checksum(boxIds);
}

// Find common characters between boxIds that differ by single character
export function part2(input: string): string {
  const lines = input.split("\n");
  return findSingleDiffCommonChars(lines);
}

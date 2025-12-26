import { A } from "../common/array.ts";
import { M } from "../common/math.ts";

export const duplicates = <T>(
  arrs: T[][],
): T[] => [
  ...new Set(
    arrs[0].filter((x) => arrs.slice(1).every((other) => other.includes(x))),
  ),
];

const charToPriority = (s: string): number => {
  const c = s.charCodeAt(0);
  return c > 96 ? c - 96 : c - 38;
};

const sumPriorities = (chars: string[]) => M.sum(chars.map(charToPriority));

export function part1(input: string) {
  const lines = input.split("\n");
  return lines
    .map(A.splitter(""))
    .map(A.divide)
    .map(duplicates)
    .map(sumPriorities)
    .reduce(M.add, 0);
}

export function part2(input: string) {
  const lines = input.split("\n");
  const sacks = lines.map(A.splitter(""));
  const groups = A.chunk(sacks, 3);
  const badges = groups
    .map(duplicates)
    .map(A.head)
    .map(charToPriority);
  return M.sum(badges);
}

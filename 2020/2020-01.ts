import { A } from "../common/array.ts";
import { P } from "../common/parse.ts";

// Find 2 entries that sum to 2020
export function part1(input: string) {
  const numbers = P.linesAsNumbers(input);
  const combinations = A.combinations(numbers, 2);
  const match = combinations.find(([a, b]) => a + b === 2020);
  if (!match) throw new Error("Could not find match");
  return match[0] * match[1];
}

// Find 3 entries that sum to 2020
export function part2(input: string) {
  const numbers = P.linesAsNumbers(input);
  const combinations = A.combinations(numbers, 3);
  const match = combinations.find(([a, b, c]) => a + b + c === 2020);
  if (!match) throw new Error("Could not find match");
  return match[0] * match[1] * match[2];
}

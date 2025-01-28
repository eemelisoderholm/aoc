import { M } from "../../common/math.ts";

const parseNumbers = (input: string): number[] =>
  input.split("").map((c) => parseInt(c));

const matchNext = <T>(x: T, i: number, arr: T[]): boolean =>
  (arr[i + 1] || arr[0]) === x;

const matchNextHalf = <T>(x: T, i: number, arr: T[]): boolean =>
  arr[(i + (arr.length / 2)) % arr.length] === x;

// Find the sum of digits that match the next digit
export function part1(input: string) {
  const nums = parseNumbers(input);
  const valid = nums.filter(matchNext);
  return M.sum(valid);
}

// Find the sum of digits that match the next digit half way around the list
export function part2(input: string) {
  const nums = parseNumbers(input);
  const valid = nums.filter(matchNextHalf);
  return M.sum(valid);
}

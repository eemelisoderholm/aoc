import { P } from "../../common/parse.ts";
import { M } from "../../common/math.ts";
import { SORT } from "../../common/sort.ts";

// What is the highest total calorie bag
export function part1(input: string) {
  const bags = input.split("\n\n");
  const sums = bags.map(P.linesAsNumbers).map(M.sum);
  return Math.max(...sums);
}

// What is the total of three highest calorie bags
export function part2(input: string) {
  const bags = input.split("\n\n");
  const sums = bags.map(P.linesAsNumbers).map(M.sum);
  const top3 = sums.toSorted(SORT.descending).slice(0, 3);
  return M.sum(top3);
}

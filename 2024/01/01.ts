import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";

function lineToLocationPair(ln: string): [number, number] {
  return ln.trim().split("   ").map((x) => parseInt(x)) as [number, number];
}

function parseLocationLists(input: string): [number[], number[]] {
  const lines = input.split("\n");
  const pairs = lines.map(lineToLocationPair);
  return [
    pairs.map(A.head).toSorted(),
    pairs.map(A.last).toSorted(),
  ];
}

// Find the total distance between the lists
export function part1(input: string) {
  const [listA, listB] = parseLocationLists(input);
  // "Within each pair, figure out how far apart the two numbers are;
  // you'll need to add up all of those distances."
  const diffs = listA.map((a, i) => M.diff(a, listB[i]));
  return M.sum(diffs);
}

// Find similarity score of the lists
export function part2(input: string) {
  const [listA, listB] = parseLocationLists(input);
  // "Calculate a total similarity score by adding up each number in
  // the left list after multiplying it by the number of times that
  // number appears in the right list."
  const scores = listA.map((a) => a * A.count(a, listB));
  return M.sum(scores);
}

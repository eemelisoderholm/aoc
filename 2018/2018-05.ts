import { L } from "../common/language.ts";

const isOppositePolarity = (a: string, b: string): boolean =>
  a !== b && a.toLocaleLowerCase() === b.toLocaleLowerCase();

// Remove all neighbouring characters with opposite polarity,
// until the polymer is stable (i.e. no aA, bB, cC... pairs)
// dabAcCaCBAcCcaDA -> dabCBAcaDA
const getCollapsedPolymerLength = (polymer: string): number => {
  const stack: string[] = [];
  for (const unit of polymer) {
    const prev = stack[stack.length - 1];
    if (prev && isOppositePolarity(unit, prev)) {
      stack.pop();
      continue;
    }
    stack.push(unit);
  }
  return stack.length;
};

// Get the lengths of the collapsed polymers, when all instances
// of each different unit type are removed before collapsing
// dabAcCaCBAcCcaDA -> remove a/A -> dbcCCBcCcD     -> dbCBcD -> 6
// dabAcCaCBAcCcaDA -> remove b/B -> daAcCaCAcCcaDA -> daCAcaDA -> 8
const getModifiedPolymerLengths = (input: string): number[] =>
  L.alphabet.split("").map((char) =>
    getCollapsedPolymerLength(
      input
        .replaceAll(char, "")
        .replaceAll(char.toUpperCase(), ""),
    )
  );

// "How many units remain after fully reacting the polymer you scanned?"
export function part1(input: string) {
  return getCollapsedPolymerLength(input);
}

// "What is the length of the shortest polymer you can produce by removing
//  all units of exactly one type and fully reacting the result?"
export function part2(input: string) {
  return Math.min(...getModifiedPolymerLengths(input));
}

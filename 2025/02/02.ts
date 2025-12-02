import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";

type Range = [number, number];

// "11-22,95-115,998-1012" => [[11, 22], [95, 115], [998, 1012]]
const parseInputRanges = (input: string): Range[] =>
  input.split(",").map((segment) =>
    segment.split("-").map((part) => parseInt(part)) as Range
  );

const rangeToNumbers = ([start, end]: Range): number[] =>
  A.range(start, end + 1);

const getNumberMatcher = (regex: RegExp) => (num: number): number =>
  parseInt(num.toString().match(regex)?.[0]!);

const findNumberPatternsInRanges = (ranges: Range[], regex: RegExp) =>
  ranges
    .flatMap(rangeToNumbers)
    .map(getNumberMatcher(regex))
    .filter(Number.isFinite);

// Add up all invalid IDs within the ranges
// Invalid: "Made only of some sequence of digits repeated twice"
export function part1(input: string) {
  const ranges = parseInputRanges(input);
  const patternFullRepeat = /^(\d+)\1$/;
  const patterns = findNumberPatternsInRanges(ranges, patternFullRepeat);
  return M.sum(patterns);
}

// Add up all invalid IDs within the ranges, invalid being
// Invalid: "Made only of some sequence of digits repeated at least twice"
export function part2(input: string) {
  const ranges = parseInputRanges(input);
  const patternMultiRepeat = /^(\d+)(\1)+$/;
  const patterns = findNumberPatternsInRanges(ranges, patternMultiRepeat);
  return M.sum(patterns);
}

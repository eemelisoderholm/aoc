import { M } from "../../common/math.ts";

const parseInput = (input: string) => {
  const [ranges, ids] = input.split("\n\n").map((seg) => seg.split("\n"));
  return {
    ranges: ranges.map(parseRange),
    ids: ids.map((id) => parseInt(id)),
  };
};

const parseRange = (line: string): [number, number] =>
  line.split("-").map((id) => parseInt(id)) as [number, number];

// Get a predicate that tests whether value is within given ranges
const getRangeFilter = (ranges: [number, number][]) => (id: number): boolean =>
  ranges.some(([min, max]) => id >= min && id <= max);

/**
 * Merge ranges so they are sorted and any overlaps are combined
 * [[5, 7], [2, 6], [9, 11]] => [[2, 7], [9, 11]]
 */
const mergeRanges = (ranges: [number, number][]): [number, number][] => {
  if (!ranges.length) return [];
  const sorted = ranges.toSorted(([a], [b]) => a - b);
  const result: [number, number][] = [];
  let [start, end] = sorted[0]; // Prev range
  for (let i = 1; i < sorted.length; i++) {
    const [min, max] = sorted[i]; // Next range
    if (min <= end) {
      // Overlaps with previous range
      // -> Extend with whichever is greater
      end = Math.max(max, end);
    } else {
      // Does not overlap with previous range
      // -> Close previous and start a new range
      result.push([start, end]);
      [start, end] = [min, max];
    }
  }
  result.push([start, end]);
  return result;
};

const totalValuesWithinRange = ([min, max]: [number, number]) => max - min + 1;

// "How many of the available ingredient IDs are fresh?"
export function part1(input: string) {
  const { ranges, ids } = parseInput(input);
  const isFresh = getRangeFilter(ranges);
  return ids.filter(isFresh).length;
}

// "How many [possible fresh IDs] according to the ranges?"
export function part2(input: string) {
  const { ranges } = parseInput(input);
  const mergedRanges = mergeRanges(ranges);
  return M.sum(mergedRanges.map(totalValuesWithinRange));
}

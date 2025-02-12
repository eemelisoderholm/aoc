import { A } from "../../common/array.ts";
import { SORT } from "../../common/sort.ts";

// Get characters of each column in the input
const parseColumns = (input: string): string[][] => {
  const rows = input.split("\n").map((line) => line.split(""));
  const cols = A.transpose(rows);
  return cols;
};

// Get a row made of each column's most frequent characters
const getMostFreqCharRow = (columns: string[][]): string[] =>
  columns.map((col) => A.freqSort(col, SORT.descending)[0]);

// Get a row made of each column's least frequent character
const getLeastFreqCharRow = (columns: string[][]): string[] =>
  columns.map((col) => A.freqSort(col, SORT.ascending)[0]);

export function part1(input: string) {
  const columns = parseColumns(input);
  return getMostFreqCharRow(columns).join("");
}

export function part2(input: string) {
  const columns = parseColumns(input);
  return getLeastFreqCharRow(columns).join("");
}

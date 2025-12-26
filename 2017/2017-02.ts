import { M } from "../common/math.ts";

const parseSheet = (input: string): number[][] =>
  input.split("\n").map((line) => line.split(/\s/).map((x) => parseInt(x)));

// Checksum is sum of the differences between each row's min and max value
const checksum = (sheet: number[][]): number =>
  M.sum(sheet.map((row) => Math.max(...row) - Math.min(...row)));

// Divide the first two values of the row that divide evenly
const firstDivisibleResult = (row: number[]) => {
  for (let i = 0; i < row.length; i++) {
    for (let j = 0; j < row.length; j++) {
      if (i === j) continue;
      if (row[i] % row[j] === 0) return row[i] / row[j];
    }
  }
  return 0;
};

// Find the checksum for the input sheet
export function part1(input: string) {
  const sheet = parseSheet(input);
  return checksum(sheet);
}

// Find the sum of first divisible values of each row
export function part2(input: string) {
  const sheet = parseSheet(input);
  const divisions = sheet.map(firstDivisibleResult);
  return M.sum(divisions);
}

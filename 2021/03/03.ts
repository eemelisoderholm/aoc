import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";
import { P } from "../../common/parse.ts";

type Bit = 0 | 1;

function findCommonBitPattern(
  input: Bit[][],
  invert = false,
  offset = 0,
): Bit[] {
  const column = input.map((bits) => bits[offset]);
  const common = findCommonBit(column);
  const filter = invert
    ? (x: Bit[]) => x[offset] !== common
    : (x: Bit[]) => x[offset] === common;
  const result = input.filter(filter);
  return result.length < 2
    ? result[0]
    : findCommonBitPattern(result, invert, offset + 1);
}

function findCommonBit(bits: Bit[]): Bit {
  const [zeros, ones] = A.partition(bits, (x) => x === 0);
  if (zeros.length > ones.length) return 0;
  return 1;
}

// Multiply gamma rate by epsilon rate
export function part1(input: string) {
  const lines = input.split("\n");
  const rows = lines.map((l) => l.split("").map((c) => parseInt(c)));
  const cols = A.transpose(rows);
  // Gamma rate bits are the most common bit in each column
  const gamma = cols.map((col) => Math.round(M.average(col)));
  // Epsilon rate bits are the least common bit in each column
  const epsilon = gamma.map((digit) => digit === 1 ? 0 : 1);
  return P.binAsDec(gamma) * P.binAsDec(epsilon);
}

// Multiply oxygen generator rating by CO2 scrubber rating
export function part2(input: string) {
  const lines = input.split("\n");
  const rows = lines.map((l) => l.split("").map((c) => P.asBit(c)));
  const oxygen = findCommonBitPattern(rows);
  const scrubber = findCommonBitPattern(rows, true);
  return P.binAsDec(oxygen) * P.binAsDec(scrubber);
}

import { A } from "./array.ts";

const lines = (input: string): string[] => input.split("\n");

/**
 * Parse lines into an integer number array, throwing on
 * any line that is not a finite number (i.e. NaN)
 */
const linesAsNumbers = (input: string): number[] =>
  lines(input).map((ln) => {
    const n = parseInt(ln, 10);
    if (!Number.isFinite(n)) {
      throw new Error(`Could not parse line "${ln}" as a finite number`);
    }
    return n;
  });

/**
 * Parse a binary string or array of bits as decimal number,
 * throwing if it does not result as a finite number (i.e. NaN)
 */
const binAsDec = (input: string | number[]): number => {
  const n = parseInt(typeof input === "string" ? input : input.join(""), 2);
  if (!Number.isFinite(n)) {
    throw new Error(`Could not parse line "${input}" as a finite number`);
  }
  return n;
};

function asBit(x: string): 0 | 1 {
  if (typeof x !== "string") {
    throw new Error(`P.bit: ${x} is type ${typeof x}, expected string`);
  }
  const value = parseInt(x, 2);
  if (value !== 0 && value !== 1) {
    throw new Error(`P.bit: ${x} would parse to ${value}, expected 0 or 1`);
  }
  return value as 0 | 1;
}

/**
 * Parse text into square grid of rows, using given padder
 * as a fill in case of row/column length variance
 */
const asCharRowGrid = (input: string, padder = " "): string[][] => {
  const lines = input.split("\n");
  const width = Math.max(...lines.map((l) => l.length));
  return lines.map((line) => line.padEnd(width, padder).split(""));
};

/**
 * Parse text into square grid of columns, using given padder
 * as a fill in case of row/column length variance
 */
const asCharColGrid = (input: string, padder = " "): string[][] =>
  A.transpose(asCharRowGrid(input, padder));

export const P = {
  lines,
  linesAsNumbers,
  binAsDec,
  asBit,
  asCharRowGrid,
  asCharColGrid,
};

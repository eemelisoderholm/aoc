import { M } from "../common/math.ts";
import { V2 } from "../common/vector2.ts";

type GridValue<T> = { x: number; y: number; v: T };

// Number position is the position of first digit of the number
type GridNumber = GridValue<number>;
type GridSymbol = GridValue<string>;

interface Schema {
  numbers: GridNumber[];
  symbols: GridSymbol[];
}

const isDigit = (char: string): boolean => !Number.isNaN(parseInt(char));
const isSymbol = (char: string): boolean => char !== "." && !isDigit(char);

// Test if the character in given position terminates
// a consecutive string of digits on the line
const isEndOfNumber = (line: string, pos: number) =>
  // Previous character is a digit AND
  isDigit(line.charAt(pos - 1)) && (
    // Current character is not a digit OR
    !isDigit(line.charAt(pos)) ||
    // It's the last character of the line
    pos >= line.length - 1
  );

// Parse input into list of numbers and symbols with positions
function parseSchema(input: string): Schema {
  const symbols: GridSymbol[] = [];
  const numbers: GridNumber[] = [];
  const lines = input.split("\n");
  lines.forEach((line, y) => {
    let digits: number[] = [];
    line.split("").forEach((char, x) => {
      if (isDigit(char)) {
        digits.push(parseInt(char));
      }
      if (isEndOfNumber(line, x)) {
        numbers.push({
          v: parseInt(digits.join("")),
          x: x - digits.length,
          y,
        });
        digits = [];
      }
      if (isSymbol(char)) {
        symbols.push({ x, y, v: char });
      }
    });
  });
  return { symbols, numbers };
}

// Test each cell a number occupies to see if any of them
// are adjacent to the position of the given symbol
function isNumberTouchingSymbol(number: GridNumber, symbol: GridSymbol) {
  return Array.from(number.v.toString()).some((_, i) =>
    V2.adjacent(symbol, { ...number, x: number.x + i })
  );
}

// Sum grid numbers that are adjacent to one or more symbols
export function part1(input: string) {
  const schema = parseSchema(input);
  const nums = schema.numbers.filter((num) =>
    schema.symbols.some((sym) => isNumberTouchingSymbol(num, sym))
  );
  return M.sum(nums.map((n) => n.v));
}

// Find * symbols with exactly two adjacent numbers,
// multiply the two numbers and sum the results
export function part2(input: string) {
  const schema = parseSchema(input);
  const stars = schema.symbols.filter((sym) => sym.v === "*");
  const gears = stars.map((sym) =>
    schema.numbers.filter((num) => isNumberTouchingSymbol(num, sym))
  ).filter((nums) => nums.length === 2);
  const gearRatios = gears.map(([a, b]) => a.v * b.v);
  return M.sum(gearRatios);
}

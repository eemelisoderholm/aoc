import { L } from "../../common/language.ts";
import { M } from "../../common/math.ts";

const digitWords = Object.keys(L.digits).filter((d) => d !== "zero");
const digitWordsRegExp = new RegExp(digitWords.join("|"), "g");

type DigitOptions = { last?: boolean; words?: boolean };
function findDigit(str: string, { last, words }: DigitOptions = {}): number {
  for (let i = 0; i < str.length; i++) {
    const segment = last ? str.slice((i + 1) * -1) : str.slice(0, i + 1);
    const digit = segment.match(/\d/);
    if (digit && digit.length) return parseInt(digit[0]);
    const word = segment.match(digitWordsRegExp);
    if (words && word && word.length) {
      return digitWords.indexOf(word[0]) + 1;
    }
  }
  throw new Error("Could not find digit");
}

function parseFirstAndLastDigit(str: string, words = false): number {
  const first = findDigit(str, { words, last: false });
  const last = findDigit(str, { words, last: true });
  return parseInt(`${first}${last}`);
}

// Find the sum of all the calibration values
export function part1(input: string) {
  const lines = input.split("\n");
  const nums = lines.map((line) => parseFirstAndLastDigit(line));
  return M.sum(nums);
}

// Find the sum of all the calibration values, while
// supporting digits spelled out as words (i.e. "two")
export function part2(input: string) {
  const lines = input.split("\n");
  const nums = lines.map((line) => parseFirstAndLastDigit(line, true));
  return M.sum(nums);
}

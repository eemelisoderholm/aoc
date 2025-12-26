import { L } from "../common/language.ts";

// "It contains at least three vowels"
const threeWovels = new RegExp(`^(?=(.*[${L.wovels}]){3})`);
// "It contains at least one letter that appears twice in a row"
const letterTwiceInARow = /(\w)\1/;
// "It does not contain the strings ab, cd, pq, or xy"
const forbiddenWords = /(ab|cd|pq|xy)/;
// "It contains a pair of any two letters that appears at least twice
//  in the string without overlapping"
const twoPairsOfTwoLetters = /(\w{2}).*\1/;
// "It contains at least one letter which repeats with
//  exactly one letter between them"
const repeatingWithOneBetween = /(\w).\1/;

// Find how many lines in the input are nice according to first rule set
export function part1(input: string) {
  return input.split("\n").filter((s) => (
    threeWovels.test(s) &&
    letterTwiceInARow.test(s) &&
    !forbiddenWords.test(s)
  )).length;
}

// Find how many lines in the input are nice according to second rule set
export function part2(input: string) {
  return input.split("\n").filter((s) => (
    twoPairsOfTwoLetters.test(s) &&
    repeatingWithOneBetween.test(s)
  )).length;
}

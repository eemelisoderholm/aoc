const alphabet = "abcdefghijklmnopqrstuvwxyz";
const wovels = "aeiou";
const consonants = "bcdfghjklmnpqrstvwxyz";
const digits = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
} as const satisfies Record<string, number>;

export const L = {
  alphabet,
  wovels,
  consonants,
  digits,
};

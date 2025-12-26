import { M } from "../common/math.ts";

const parseInputBanks = (input: string): number[][] =>
  input.split("\n").map((line) =>
    line.split("").map((digit) => parseInt(digit))
  );

// Find n digits to activate for the highest possible value
const getMaxJoltage = (bank: number[], limit: number): number => {
  const picks: number[] = [];
  let startIndex = 0; // First unpicked index to slice from
  while (picks.length < limit) {
    // Last index which excludes enough items to pick the rest from
    const endIndex = bank.length - (limit - picks.length) + 1;
    const candidates = bank.slice(startIndex, endIndex);
    const pick = Math.max(...candidates);
    picks.push(pick);
    startIndex += candidates.indexOf(pick) + 1;
  }
  return parseInt(picks.join(""));
};

// Find the total joltage when activating 2 batteries from each bank
export function part1(input: string) {
  const banks = parseInputBanks(input);
  const joltages = banks.map((bank) => getMaxJoltage(bank, 2));
  return M.sum(joltages);
}

// Find the total joltage when activating 12 batteries from each bank
export function part2(input: string) {
  const banks = parseInputBanks(input);
  const joltages = banks.map((bank) => getMaxJoltage(bank, 12));
  return M.sum(joltages);
}

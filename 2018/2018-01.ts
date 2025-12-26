import { M } from "../common/math.ts";

const parseChanges = (input: string): number[] =>
  input.split(/\n|,\s/).map((x) => parseInt(x));

// Loop the changes until a number is hit twice
function firstDoubleFreq(changes: number[]) {
  let freq: number = 0;
  const freqs = new Set<number>([freq]);
  for (let i = 0;; i++) {
    freq += changes[i % changes.length];
    if (freqs.has(freq)) return freq;
    freqs.add(freq);
  }
}

// Find the result of applying all frequency changes
export function part1(input: string) {
  const changes = parseChanges(input);
  return M.sum(changes);
}

// Find the first frequency that is reached twice
export function part2(input: string) {
  const changes = parseChanges(input);
  return firstDoubleFreq(changes);
}

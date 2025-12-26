import { C } from "../common/crypto.ts";

function mine(key: string, targetPrefix: string): number {
  for (let i = 0;; i++) {
    const hash = C.md5(key + i);
    if (hash.startsWith(targetPrefix)) return i;
  }
}

// Find first MD5 hash which start with at least five zeroes
export function part1(input: string): number {
  return mine(input, "0".repeat(5));
}

// Find first MD5 hash which start with at least siz zeroes
export function part2(input: string): number {
  return mine(input, "0".repeat(6));
}

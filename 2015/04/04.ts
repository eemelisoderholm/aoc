import { crypto } from "@std/crypto";

async function computeMD5Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest("MD5", data);
  const bytes = Array.from(new Uint8Array(buffer));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function mine(key: string, targetPrefix: string): Promise<number> {
  for (let i = 0;; i++) {
    const hash = await computeMD5Hex(key + i);
    if (hash.startsWith(targetPrefix)) return i;
  }
}

// Find first MD5 hash which start with at least five zeroes
export function part1(input: string): Promise<number> {
  return mine(input, "0".repeat(5));
}

// Find first MD5 hash which start with at least siz zeroes
export function part2(input: string): Promise<number> {
  return mine(input, "0".repeat(6));
}

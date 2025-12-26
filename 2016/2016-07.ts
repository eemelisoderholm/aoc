import { A } from "../common/array.ts";

// Split lines into segments by brackets
// "ioxxoj[asdfgh]zxcvbn" => ["ioxxoj", "asdfgh", "zxcvbn"]
const parseAddresses = (input: string): string[][] =>
  input.split("\n").map((line) => line.split(/\[|\]/));

// Even address segments are supernet, odd segments are hypernet
const isSupernet = (_addr: string, i: number): boolean => i % 2 === 0;

// "An ABBA is any four-character sequence which consists of a pair of
// two different characters followed by the reverse of that pair"
const hasABBA = (value: string): boolean => {
  for (let i = 3; i < value.length; i++) {
    const [a, b, c, d] = value.slice(i - 3, i + 1);
    if (a === b || c === d) continue;
    if (a === d && b === c) return true;
  }
  return false;
};

// "An ABA is any three-character sequence which consists of the
// same character twice with a different character between them"
const getABAs = (v: string): string[] => {
  const ABAs: string[] = [];
  for (let i = 2; i < v.length; i++) {
    const slice = v.slice(i - 2, i + 1);
    const [a, b, c] = slice;
    if (a === c && a !== b) ABAs.push(slice);
  }
  return ABAs;
};

// "ABA" => "BAB"
const toBAB = (v: string): string => [v[1], v[0], v[1]].join("");

// Address supports TLS if it has an ABBA in supernet, but not hypernet
const supportsTLS = (address: string[]): boolean => {
  const [supernet, hypernet] = A.partition(address, isSupernet);
  return supernet.some(hasABBA) && !hypernet.some(hasABBA);
};

// Adress supports SSL if it has an ABA in supernet and matching BAB in hypernet
const supportsSSL = (address: string[]): boolean => {
  const [supernet, hypernet] = A.partition(address, isSupernet);
  const supernetABAs = supernet.flatMap(getABAs);
  const hypernetBABs = hypernet.flatMap(getABAs).map(toBAB);
  return supernetABAs.some((a) => hypernetBABs.some((b) => a === b));
};

// "How many IPs in your puzzle input support TLS?"
export function part1(input: string) {
  const addresses = parseAddresses(input);
  return addresses.filter(supportsTLS).length;
}

// "How many IPs_ in your puzzle input support SSL?"
export function part2(input: string) {
  const addresses = parseAddresses(input);
  return addresses.filter(supportsSSL).length;
}

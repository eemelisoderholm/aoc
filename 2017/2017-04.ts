const noDuplicates = <T>(arr: T[]): boolean =>
  arr.every((x, _, xs) => xs.indexOf(x) === xs.lastIndexOf(x));

const sortChars = (x: string): string => x.split("").toSorted().join("");

const noDuplicateWords = (pw: string) => noDuplicates(pw.split(" "));
const noAnagramWords = (pw: string) =>
  noDuplicates(pw.split(" ").map(sortChars));

export function part1(input: string) {
  const passwords = input.split("\n");
  return passwords.filter(noDuplicateWords).length;
}

export function part2(input: string) {
  const passwords = input.split("\n");
  return passwords.filter(noAnagramWords).length;
}

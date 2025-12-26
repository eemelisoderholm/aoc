import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2018-02.ts";

const exampleInputA = `
abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab
`.trim();
const exampleInputB = `
abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
`.trim();
const realInput = await Deno.readTextFile("./2018/2018-02-input.txt");

Deno.test("2018 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 12);
});

Deno.test("2018 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 6225);
});

Deno.test("2018 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), "fgij");
});

Deno.test("2018 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), "revtaubfniyhsgxdoajwkqilp");
});

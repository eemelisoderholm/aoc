import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./07.ts";

const exampleInputA = `
abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn
`.trim();
const exampleInputB = `
aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb
`.trim();
const realInput = await Deno.readTextFile("./2016/07/07.txt");

Deno.test("2016 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 2);
});

Deno.test("2016 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 105);
});

Deno.test("2016 Day 07 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 3);
});

Deno.test("2016 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 258);
});

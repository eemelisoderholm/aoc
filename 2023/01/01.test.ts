import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./01.ts";

const exampleInputA = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim();

const exampleInputB = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim();

const realInput = await Deno.readTextFile("./2023/01/01.txt");

Deno.test("2023 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 142);
});

Deno.test("2023 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 55834);
});

Deno.test("2023 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 281);
});

Deno.test("2023 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 53221);
});

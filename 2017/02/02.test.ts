import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInputA = `
5 1 9 5
7 5 3
2 4 6 8
`.trim();
const exampleInputB = `
5 9 2 8
9 4 7 3
3 8 6 5
`.trim();
const realInput = await Deno.readTextFile("./2017/02/02.txt");

Deno.test("2017 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 18);
});

Deno.test("2017 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 53460);
});

Deno.test("2017 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 9);
});

Deno.test("2017 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 282);
});

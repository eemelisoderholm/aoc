import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInput = `
ULL
RRDDD
LURDL
UUUUD
`.trim();
const realInput = await Deno.readTextFile("./2016/02/02.txt");

Deno.test("2016 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), "1985");
});

Deno.test("2016 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), "48584");
});

Deno.test("2016 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), "5DB3");
});

Deno.test("2016 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), "563B6");
});

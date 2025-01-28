import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInput = "A Y\nB X\nC Z";
const realInput = await Deno.readTextFile("./2022/02/02.txt");

Deno.test("Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 15);
});

Deno.test("Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 14264);
});

Deno.test("Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 12);
});

Deno.test("Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 12382);
});

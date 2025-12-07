import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim();
const realInput = await Deno.readTextFile("./2025/04/04.txt");

Deno.test("2025 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 13);
});

Deno.test("2025 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1523);
});

Deno.test("2025 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 43);
});

Deno.test("2025 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 9290);
});

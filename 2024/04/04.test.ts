import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();
const realInput = await Deno.readTextFile("./2024/04/04.txt");

Deno.test("2024 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 18);
});

Deno.test("2024 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 2633);
});

Deno.test("2024 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 9);
});

Deno.test("2024 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1936);
});

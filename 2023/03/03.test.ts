import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const exampleInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();
const realInput = await Deno.readTextFile("./2023/03/03.txt");

Deno.test("2023 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 4361);
});

Deno.test("2023 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 519444);
});

Deno.test("2023 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 467835);
});

Deno.test("2023 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 74528807);
});

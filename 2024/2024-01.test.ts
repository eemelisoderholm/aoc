import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2024-01.ts";

const exampleInput = `
3   4
4   3
2   5
1   3
3   9
3   3
`.trim();
const realInput = await Deno.readTextFile("./2024/2024-01-input.txt");

Deno.test("2024 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 11);
});

Deno.test("2024 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 2031679);
});

Deno.test("2024 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 31);
});

Deno.test("2024 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 19678534);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2025-03.ts";

const exampleInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();
const realInput = await Deno.readTextFile("./2025/2025-03-input.txt");

Deno.test("2025 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 357);
});

Deno.test("2025 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 17100);
});

Deno.test("2025 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 3121910778619);
});

Deno.test("2025 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 170418192256861);
});

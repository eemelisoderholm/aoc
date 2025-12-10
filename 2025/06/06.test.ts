import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./06.ts";

const exampleInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +
`.trim();
const realInput = await Deno.readTextFile("./2025/06/06.txt");

Deno.test("2025 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 4277556);
});

Deno.test("2025 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 6757749566978);
});

Deno.test("2025 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 3263827);
});

Deno.test("2025 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 10603075273949);
});

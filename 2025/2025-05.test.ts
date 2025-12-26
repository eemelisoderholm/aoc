import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2025-05.ts";

const exampleInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();
const realInput = await Deno.readTextFile("./2025/2025-05-input.txt");

Deno.test("2025 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 3);
});

Deno.test("2025 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 735);
});

Deno.test("2025 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 14);
});

Deno.test("2025 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 344306344403172);
});

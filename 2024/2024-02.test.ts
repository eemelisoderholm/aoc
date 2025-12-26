import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2024-02.ts";

const exampleInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();
const realInput = await Deno.readTextFile("./2024/2024-02-input.txt");

Deno.test("2024 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 2);
});

Deno.test("2024 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 483);
});

Deno.test("2024 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4);
});

Deno.test("2024 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 528);
});

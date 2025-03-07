import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`.trim();
const realInput = await Deno.readTextFile("./2023/04/04.txt");

Deno.test("2023 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 13);
});

Deno.test("2023 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 20855);
});

Deno.test("2023 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 30);
});

Deno.test("2023 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 5489600);
});

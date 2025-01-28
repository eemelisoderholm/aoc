import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./07.ts";

const exampleInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`.trim();
const realInput = await Deno.readTextFile("./2024/07/07.txt");

Deno.test("2024 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 3749);
});

Deno.test("2024 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1611660863222);
});

Deno.test("2024 Day 07 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 11387);
});

Deno.test("2024 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 945341732469724);
});

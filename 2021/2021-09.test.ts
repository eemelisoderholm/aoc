import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2021-09.ts";

const exampleInput = `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim();
const realInput = await Deno.readTextFile("./2021/2021-09-input.txt");

Deno.test("2021 Day 09 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 15);
});

Deno.test("2021 Day 09 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 498);
});

Deno.test("2021 Day 09 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 1134);
});

Deno.test("2021 Day 09 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1071000);
});

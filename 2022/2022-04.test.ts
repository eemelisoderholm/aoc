import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2022-04.ts";

const exampleInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`.trim();
const realInput = await Deno.readTextFile("./2022/2022-04-input.txt");

Deno.test("2022 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 2);
});

Deno.test("2022 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 571);
});

Deno.test("2022 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4);
});

Deno.test("2022 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 917);
});

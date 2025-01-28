import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./06.ts";

const exampleInput = `
Time:      7  15   30
Distance:  9  40  200
`.trim();
const realInput = await Deno.readTextFile("./2023/06/06.txt");

Deno.test("2023 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 288);
});

Deno.test("2023 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 633080);
});

Deno.test("2023 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 71503);
});

Deno.test("2023 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 20048741);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2021-03.ts";

const exampleInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`.trim();
const realInput = await Deno.readTextFile("./2021/2021-03-input.txt");

Deno.test("2021 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 198);
});

Deno.test("2021 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 2003336);
});

Deno.test("2021 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 230);
});

Deno.test("2021 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1877139);
});

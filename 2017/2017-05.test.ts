import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2017-05.ts";

const exampleInput = `
0
3
0
1
-3
`.trim();
const realInput = await Deno.readTextFile("./2017/2017-05-input.txt");

Deno.test("2017 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 5);
});

Deno.test("2017 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 326618);
});

Deno.test("2017 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 10);
});

Deno.test("2017 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 21841249);
});

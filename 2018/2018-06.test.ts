import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2018-06.ts";

const exampleInput = `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`.trim();
const realInput = await Deno.readTextFile("./2018/2018-06-input.txt");

Deno.test("2018 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 17);
});

Deno.test("2018 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 3840);
});

Deno.test("2018 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput, 32), 16);
});

Deno.test("2018 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 46542);
});

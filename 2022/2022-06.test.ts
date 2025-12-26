import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2022-06.ts";

const exampleInput = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`.trim();
const realInput = await Deno.readTextFile("./2022/2022-06-input.txt");

Deno.test("2022 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 7);
});

Deno.test("2022 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1042);
});

Deno.test("2022 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 19);
});

Deno.test("2022 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2980);
});

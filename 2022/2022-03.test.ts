import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2022-03.ts";

const exampleInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim();
const realInput = await Deno.readTextFile("./2022/2022-03-input.txt");

Deno.test("2022 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 157);
});

Deno.test("2022 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 7727);
});

Deno.test("2022 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 70);
});

Deno.test("2022 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2609);
});

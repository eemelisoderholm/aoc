import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./07.ts";

const exampleInput = `
123 -> x
456 -> y
x AND y -> a
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
`.trim();
const realInput = await Deno.readTextFile("./2015/07/07.txt");

Deno.test("2015 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 72);
});

Deno.test("2015 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 3176);
});

Deno.test("2015 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 14710);
});

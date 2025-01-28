import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./01.ts";

const exampleInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263";
const realInput = await Deno.readTextFile("./2021/01/01.txt");

Deno.test("Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 7);
});

Deno.test("Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1266);
});

Deno.test("Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 5);
});

Deno.test("Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1217);
});

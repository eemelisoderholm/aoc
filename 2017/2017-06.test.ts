import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2017-06.ts";

const exampleInput = "0	2	7	0";
const realInput = await Deno.readTextFile("./2017/2017-06-input.txt");

Deno.test("2017 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 5);
});

Deno.test("2017 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 6681);
});

Deno.test("2017 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4);
});

Deno.test("2017 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2392);
});

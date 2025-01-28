import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const realInput = await Deno.readTextFile("./2015/02/02.txt");

Deno.test("2015 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1("2x3x4"), 58);
  assertEquals(part1("1x1x10"), 43);
});

Deno.test("2015 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1598415);
});

Deno.test("2015 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2("2x3x4"), 34);
  assertEquals(part2("1x1x10"), 14);
});

Deno.test("2015 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 3812909);
});

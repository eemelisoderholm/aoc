import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const realInput = await Deno.readTextFile("./2016/03/03.txt");

Deno.test("2016 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 983);
});

Deno.test("2016 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1836);
});

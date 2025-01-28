import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const realInput = await Deno.readTextFile("./2019/04/04.txt");

Deno.test("2019 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1099);
});

Deno.test("2019 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 710);
});

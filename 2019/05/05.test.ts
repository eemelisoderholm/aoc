import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./05.ts";

const realInput = await Deno.readTextFile("./2019/05/05.txt");

Deno.test("2019 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 16489636);
});

Deno.test("2019 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 9386583);
});

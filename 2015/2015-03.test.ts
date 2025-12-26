import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2015-03.ts";

const realInput = await Deno.readTextFile("./2015/2015-03-input.txt");

Deno.test("2015 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(">"), 2);
  assertEquals(part1("^>v<"), 4);
  assertEquals(part1("^v^v^v^v^v"), 2);
});

Deno.test("2015 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 2565);
});

Deno.test("2015 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2("^v"), 3);
  assertEquals(part2("^>v<"), 3);
  assertEquals(part2("^v^v^v^v^v"), 11);
});

Deno.test("2015 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2639);
});

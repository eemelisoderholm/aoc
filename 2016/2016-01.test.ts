import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2016-01.ts";

const realInput = await Deno.readTextFile("./2016/2016-01-input.txt");

Deno.test("2016 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1("R2, L3"), 5);
  assertEquals(part1("R2, R2, R2"), 2);
  assertEquals(part1("R5, L5, R5, R3"), 12);
});

Deno.test("2016 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 252);
});

Deno.test("2016 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2("R8, R4, R4, R8"), 4);
});

Deno.test("2016 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 143);
});

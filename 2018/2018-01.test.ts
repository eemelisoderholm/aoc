import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2018-01.ts";

const realInput = await Deno.readTextFile("./2018/2018-01-input.txt");

Deno.test("2018 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1("+1, -2, +3, +1"), 3);
  assertEquals(part1("+1, +1, +1"), 3);
  assertEquals(part1("+1, +1, -2"), 0);
  assertEquals(part1("-1, -2, -3"), -6);
});

Deno.test("2018 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 477);
});

Deno.test("2018 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2("+1, -2, +3, +1"), 2);
  assertEquals(part2("+1, -1"), 0);
  assertEquals(part2("+3, +3, +4, -2, -4"), 10);
  assertEquals(part2("-6, +3, +8, +5, -6"), 5);
  assertEquals(part2("+7, +7, -2, -7, -4"), 14);
});

Deno.test("2018 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 390);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2018-05.ts";

const exampleInput = "dabAcCaCBAcCcaDA";
const realInput = await Deno.readTextFile("./2018/2018-05-input.txt");

Deno.test("2018 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 10);
});

Deno.test("2018 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 10972);
});

Deno.test("2018 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4);
});

Deno.test("2018 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 5278);
});

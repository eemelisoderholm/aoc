import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2021-07.ts";

const exampleInput = "16,1,2,0,4,2,7,1,2,14";
const realInput = await Deno.readTextFile("./2021/2021-07-input.txt");

Deno.test("2021 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 37);
});

Deno.test("2021 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 336120);
});

Deno.test("2021 Day 07 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 168);
});

Deno.test("2021 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 96864235);
});

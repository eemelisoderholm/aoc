import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2021-06.ts";

const exampleInput = "3,4,3,1,2";
const realInput = await Deno.readTextFile("./2021/2021-06-input.txt");

Deno.test("2021 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 5934);
});

Deno.test("2021 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 352195);
});

Deno.test("2021 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 26984457539);
});

Deno.test("2021 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1600306001288);
});

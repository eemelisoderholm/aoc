import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./01.ts";

const exampleInput =
  "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000";
const realInput = await Deno.readTextFile("./2022/01/01.txt");

Deno.test("Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 24000);
});

Deno.test("Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 69310);
});

Deno.test("Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 45000);
});

Deno.test("Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 206104);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInput = "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2";
const realInput = await Deno.readTextFile("./2021/02/02.txt");

Deno.test("Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 150);
});

Deno.test("Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1524750);
});

Deno.test("Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 900);
});

Deno.test("Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1592426537);
});

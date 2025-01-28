import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./01.ts";

const exampleInput = "100756";
const realInput = await Deno.readTextFile("./2019/01/01.txt");

Deno.test("2019 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 33583);
});

Deno.test("2019 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 3331523);
});

Deno.test("2019 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 50346);
});

Deno.test("2019 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 4994396);
});

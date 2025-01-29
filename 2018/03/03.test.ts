import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const exampleInput = `
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`.trim();
const realInput = await Deno.readTextFile("./2018/03/03.txt");

Deno.test("2018 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 4);
});

Deno.test("2018 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 113966);
});

Deno.test("2018 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 3);
});

Deno.test("2018 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 235);
});

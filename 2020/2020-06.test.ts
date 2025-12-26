import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2020-06.ts";

const exampleInput = `
abc

a
b
c

ab
ac

a
a
a
a

b
`.trim();
const realInput = await Deno.readTextFile("./2020/2020-06-input.txt");

Deno.test("2020 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 11);
});

Deno.test("2020 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 6763);
});

Deno.test("2020 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 6);
});

Deno.test("2020 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 3512);
});

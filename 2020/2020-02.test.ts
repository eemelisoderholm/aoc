import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2020-02.ts";

const exampleInput = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`.trim();
const realInput = await Deno.readTextFile("./2020/2020-02-input.txt");

Deno.test("2020 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 2);
});

Deno.test("2020 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 506);
});

Deno.test("2020 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 1);
});

Deno.test("2020 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 443);
});

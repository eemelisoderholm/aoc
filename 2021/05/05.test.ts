import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./05.ts";

const exampleInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim();
const realInput = await Deno.readTextFile("./2021/05/05.txt");

Deno.test("2021 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 5);
});

Deno.test("2021 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 5147);
});

Deno.test("2021 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 12);
});

Deno.test("2021 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 16925);
});

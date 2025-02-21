import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`.trim();
const realInput = await Deno.readTextFile("./2021/04/04.txt");

Deno.test("2021 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 4512);
});

Deno.test("2021 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 23177);
});

Deno.test("2021 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 1924);
});

Deno.test("2021 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 6804);
});

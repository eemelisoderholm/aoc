import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2020-05.ts";

const exampleInput1 = "FBFBBFFRLR";
const exampleInput2 = "BFFFBBFRRR";
const exampleInput3 = "FFFBBBFRRR";
const exampleInput4 = "BBFFBBFRLL";

const realInput = await Deno.readTextFile("./2020/2020-05-input.txt");

Deno.test("2020 Day 05 Part 1 - Example Input 1", () => {
  assertEquals(part1(exampleInput1), 357);
});

Deno.test("2020 Day 05 Part 1 - Example Input 2", () => {
  assertEquals(part1(exampleInput2), 567);
});

Deno.test("2020 Day 05 Part 1 - Example Input 3", () => {
  assertEquals(part1(exampleInput3), 119);
});

Deno.test("2020 Day 05 Part 1 - Example Input 4", () => {
  assertEquals(part1(exampleInput4), 820);
});

Deno.test("2020 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 848);
});

Deno.test("2020 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 682);
});

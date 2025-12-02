import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
`.trim();
const realInput = await Deno.readTextFile("./2025/02/02.txt");

Deno.test("2025 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 1227775554);
});

Deno.test("2025 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 24043483400);
});

Deno.test("2025 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4174379265);
});

Deno.test("2025 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 38262920235);
});

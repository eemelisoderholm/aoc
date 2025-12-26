import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./yyyy-dd.ts";

const exampleInput = `

`.trim();
const realInput = await Deno.readTextFile("./yyyy/yyyy-dd.txt");

Deno.test("yyyy Day dd Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 0);
});

Deno.test("yyyy Day %dd% Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 0);
});

Deno.test("yyyy Day dd Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 0);
});

Deno.test("yyyy Day dd Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 0);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2025-01.ts";

const exampleInputA = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim();

const realInput = await Deno.readTextFile("./2025/2025-01-input.txt");

Deno.test("2025 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 3);
});

Deno.test("2025 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1165);
});

Deno.test("2025 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputA), 6);
});

Deno.test("2025 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 6496);
});

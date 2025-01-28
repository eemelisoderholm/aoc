import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./02.ts";

const exampleInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`.trim();
const realInput = await Deno.readTextFile("./2023/02/02.txt");

Deno.test("2023 Day 02 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 8);
});

Deno.test("2023 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 2204);
});

Deno.test("2023 Day 02 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 2286);
});

Deno.test("2023 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 71036);
});

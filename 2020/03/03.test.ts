import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const exampleInput = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`.trim();
const realInput = await Deno.readTextFile("./2020/03/03.txt");

Deno.test("2020 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 7);
});

Deno.test("2020 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 167);
});

Deno.test("2020 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 336);
});

Deno.test("2020 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 736527114);
});

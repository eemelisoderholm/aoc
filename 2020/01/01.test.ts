import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./01.ts";

const exampleInput = `
1721
979
366
299
675
1456
`.trim();
const realInput = await Deno.readTextFile("./2020/01/01.txt");

Deno.test("2020 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 514579);
});

Deno.test("2020 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 996996);
});

Deno.test("2020 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 241861950);
});

Deno.test("2020 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 9210402);
});

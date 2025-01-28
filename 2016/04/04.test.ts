import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]
`.trim();
const realInput = await Deno.readTextFile("./2016/04/04.txt");

Deno.test("2016 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 1514);
});

Deno.test("2016 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 361724);
});

Deno.test("2016 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 482);
});

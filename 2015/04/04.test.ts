import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const realInput = await Deno.readTextFile("./2015/04/04.txt");

Deno.test("2015 Day 04 Part 1 - Example Input", async () => {
  assertEquals(await part1("abcdef"), 609043);
  assertEquals(await part1("pqrstuv"), 1048970);
});

Deno.test("2015 Day 04 Part 1 - Real Input", async () => {
  assertEquals(await part1(realInput), 254575);
});

Deno.test("2015 Day 04 Part 2 - Real Input", async () => {
  assertEquals(await part2(realInput), 1038736);
});

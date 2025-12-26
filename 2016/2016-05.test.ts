import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2016-05.ts";

const exampleInput = "abc";
const realInput = await Deno.readTextFile("./2016/2016-05-input.txt");

// FIXME: Improve perf. Tests skipped because the solution is slow (~16-40s),
// so they don't slow down running the full test suite.

Deno.test({
  name: "2016 Day 05 Part 1 - Example Input",
  ignore: true,
  fn: () => {
    assertEquals(part1(exampleInput), "18f47a30");
  },
});

Deno.test({
  name: "2016 Day 05 Part 1 - Real Input",
  ignore: true,
  fn: () => {
    assertEquals(part1(realInput), "4543c154");
  },
});

Deno.test({
  name: "2016 Day 05 Part 2 - Example Input",
  ignore: true,
  fn: () => {
    assertEquals(part2(exampleInput), "05ace8e3");
  },
});

Deno.test({
  name: "2016 Day 05 Part 2 - Real Input",
  ignore: true,
  fn: () => {
    assertEquals(part2(realInput), "1050cbbd");
  },
});

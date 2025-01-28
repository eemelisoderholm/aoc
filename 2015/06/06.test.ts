import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./06.ts";

const realInput = await Deno.readTextFile("./2015/06/06.txt");

Deno.test({
  name: "2015 Day 06 Part 1 - Real Input",
  ignore: true, // FIXME: 6s runtime, skipped until more efficient solution
  fn: () => {
    assertEquals(part1(realInput), 543903);
  },
});

Deno.test({
  name: "2015 Day 06 Part 2 - Real Input",
  ignore: true, // FIXME: 6s runtime, skipped until more efficient solution
  fn: () => {
    assertEquals(part2(realInput), 14687245);
  },
});

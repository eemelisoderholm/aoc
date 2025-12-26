import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2015-01.ts";

const realInput = await Deno.readTextFile("./2015/2015-01-input.txt");

Deno.test("2015 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1("(())"), 0);
  assertEquals(part1("()()"), 0);

  assertEquals(part1("((("), 3);
  assertEquals(part1("(()(()("), 3);
  assertEquals(part1("))((((("), 3);

  assertEquals(part1("())"), -1);
  assertEquals(part1("))("), -1);

  assertEquals(part1(")))"), -3);
  assertEquals(part1(")())())"), -3);
});

Deno.test("2015 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 280);
});

Deno.test("2015 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2(")"), 1);
  assertEquals(part2("()())"), 5);
});

Deno.test("2015 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1797);
});

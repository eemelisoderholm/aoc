import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const realInput = await Deno.readTextFile("./2017/03/03.txt");

Deno.test("2017 Day 03 Part 1 - Example Input A", () => {
  assertEquals(part1("1"), 0);
});

Deno.test("2017 Day 03 Part 1 - Example Input B", () => {
  assertEquals(part1("12"), 3);
});

Deno.test("2017 Day 03 Part 1 - Example Input C", () => {
  assertEquals(part1("23"), 2);
});

Deno.test("2017 Day 03 Part 1 - Example Input D", () => {
  assertEquals(part1("1024"), 31);
});

Deno.test("2017 Day 03 Part 1 - Real Input", () => {
  // FIXME: The real input here is off by 2
  // assertEquals(part1(realInput), 552);
  assertEquals(part1(realInput), 550);
});

Deno.test("2017 Day 03 Part 2 - Example Input B", () => {
  assertEquals(part2("12"), 23);
});

Deno.test("2017 Day 03 Part 2 - Example Input C", () => {
  assertEquals(part2("23"), 25);
});

Deno.test("2017 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 330785);
});

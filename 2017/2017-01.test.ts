import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2017-01.ts";

const realInput = await Deno.readTextFile("./2017/2017-01-input.txt");

Deno.test("2017 Day 01 Part 1 - Example Input", () => {
  assertEquals(part1("1122"), 3);
  assertEquals(part1("1111"), 4);
  assertEquals(part1("1234"), 0);
  assertEquals(part1("91212129"), 9);
});

Deno.test("2017 Day 01 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 997);
});

Deno.test("2017 Day 01 Part 2 - Example Input", () => {
  assertEquals(part2("1212"), 6);
  assertEquals(part2("1221"), 0);
  assertEquals(part2("123425"), 4);
  assertEquals(part2("123123"), 12);
  assertEquals(part2("12131415"), 4);
});

Deno.test("2017 Day 01 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1358);
});

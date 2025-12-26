import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2017-04.ts";

const realInput = await Deno.readTextFile("./2017/2017-04-input.txt");

Deno.test("2017 Day 04 Part 1 - Example Input A", () => {
  assertEquals(part1("aa bb cc dd ee"), 1);
});

Deno.test("2017 Day 04 Part 1 - Example Input B", () => {
  assertEquals(part1("aa bb cc dd aa"), 0);
});

Deno.test("2017 Day 04 Part 1 - Example Input C", () => {
  assertEquals(part1("aa bb cc dd aaa"), 1);
});

Deno.test("2017 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 455);
});

Deno.test("2017 Day 04 Part 2 - Example Input A", () => {
  assertEquals(part2("abcde fghij"), 1);
});

Deno.test("2017 Day 04 Part 2 - Example Input B", () => {
  assertEquals(part2("abcde xyz ecdab"), 0);
});

Deno.test("2017 Day 04 Part 2 - Example Input C", () => {
  assertEquals(part2("a ab abc abd abf abj"), 1);
});

Deno.test("2017 Day 04 Part 2 - Example Input D", () => {
  assertEquals(part2("iiii oiii ooii oooi oooo"), 1);
});

Deno.test("2017 Day 04 Part 2 - Example Input E", () => {
  assertEquals(part2("oiii ioii iioi iiio"), 0);
});

Deno.test("2017 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 186);
});

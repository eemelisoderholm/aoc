import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2015-05.ts";

const exampleInputA = `
ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb
`.trim();

const exampleInputB = `
qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy
`.trim();

const realInput = await Deno.readTextFile("./2015/2015-05-input.txt");

Deno.test("2015 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 2);
});

Deno.test("2015 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 255);
});

Deno.test("2015 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 2);
});

Deno.test("2015 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 55);
});

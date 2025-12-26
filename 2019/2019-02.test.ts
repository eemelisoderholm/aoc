import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2019-02.ts";

const realInput = await Deno.readTextFile("./2019/2019-02-input.txt");

Deno.test("2019 Day 02 Part 1 - Example Input A", () => {
  assertEquals(part1("1,9,10,3,2,3,11,0,99,30,40,50", true), 3500);
});

Deno.test("2019 Day 02 Part 1 - Example Input B", () => {
  assertEquals(part1("1,0,0,0,99", true), 2);
});

Deno.test("2019 Day 02 Part 1 - Example Input C", () => {
  assertEquals(part1("2,3,0,3,99", true), 2);
});

Deno.test("2019 Day 02 Part 1 - Example Input D", () => {
  assertEquals(part1("2,4,4,5,99,0", true), 2);
});

Deno.test("2019 Day 02 Part 1 - Example Input E", () => {
  assertEquals(part1("1,1,1,4,99,5,6,0,99", true), 30);
});

Deno.test("2019 Day 02 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 5098658);
});

Deno.test("2019 Day 02 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 5064);
});

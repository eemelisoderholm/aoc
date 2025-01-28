import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./08.ts";

const exampleInput = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`.trim();
const realInput = await Deno.readTextFile("./2020/08/08.txt");

Deno.test("2020 Day 08 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 5);
});

Deno.test("2020 Day 08 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1179);
});

Deno.test("2020 Day 08 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 8);
});

Deno.test("2020 Day 08 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 1089);
});

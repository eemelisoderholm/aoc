import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./05.ts";

const exampleInput = `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.replace("\n", "");
const realInput = await Deno.readTextFile("./2022/05/05.txt");

Deno.test("2022 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), "CMZ");
});

Deno.test("2022 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), "LBLVVTVLP");
});

Deno.test("2022 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), "MCD");
});

Deno.test("2022 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), "TPFFBDRJD");
});

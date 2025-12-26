import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2022-09.ts";

const exampleInputA = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.trim();

const exampleInputB = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`.trim();

const realInput = await Deno.readTextFile("./2022/2022-09-input.txt");

Deno.test("2022 Day 09 Part 1 - Example Input A", () => {
  assertEquals(part1(exampleInputA), 13);
});

Deno.test("2022 Day 09 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 6311);
});

Deno.test("2022 Day 09 Part 2 - Example Input A", () => {
  assertEquals(part2(exampleInputA), 1);
});

Deno.test("2022 Day 09 Part 2 - Example Input B", () => {
  assertEquals(part2(exampleInputB), 36);
});

Deno.test("2022 Day 09 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2482);
});

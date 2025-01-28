import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const exampleInputA = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`.trim();

const exampleInputB = `
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`.trim();

const realInput = await Deno.readTextFile("./2024/03/03.txt");

Deno.test("2024 Day 03 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 161);
});

Deno.test("2024 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 159833790);
});

Deno.test("2024 Day 03 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 48);
});

Deno.test("2024 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 89349241);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./06.ts";

const exampleInputA = `
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
`.trim();

const exampleInputB = `
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
`.trim();

const realInput = await Deno.readTextFile("./2019/06/06.txt");

Deno.test("2019 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInputA), 42);
});

Deno.test("2019 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 314247);
});

Deno.test("2019 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInputB), 4);
});

Deno.test("2019 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 514);
});

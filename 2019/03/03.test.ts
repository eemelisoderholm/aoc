import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./03.ts";

const exampleInputA = `
R8,U5,L5,D3
U7,R6,D4,L4
`.trim();

const exampleInputB = `
R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83
`.trim();

const exampleInputC = `
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
`.trim();

const realInput = await Deno.readTextFile("./2019/03/03.txt");

Deno.test("2019 Day 03 Part 1 - Example Input A", () => {
  assertEquals(part1(exampleInputA), 6);
});

Deno.test("2019 Day 03 Part 1 - Example Input B", () => {
  assertEquals(part1(exampleInputB), 159);
});

Deno.test("2019 Day 03 Part 1 - Example Input A", () => {
  assertEquals(part1(exampleInputC), 135);
});

Deno.test("2019 Day 03 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 248);
});

Deno.test("2019 Day 03 Part 2 - Example Input A", () => {
  assertEquals(part2(exampleInputA), 30);
});

Deno.test("2019 Day 03 Part 2 - Example Input B", () => {
  assertEquals(part2(exampleInputB), 610);
});

Deno.test("2019 Day 03 Part 2 - Example Input C", () => {
  assertEquals(part2(exampleInputC), 410);
});

Deno.test("2019 Day 03 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 28580);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2017-07.ts";

const exampleInput = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`.trim();
const realInput = await Deno.readTextFile("./2017/2017-07-input.txt");

Deno.test("2017 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), "tknk");
});

Deno.test("2017 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), "eugwuhl");
});

Deno.test("2017 Day 07 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 60);
});

Deno.test("2017 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 420);
});

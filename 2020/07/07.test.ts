import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./07.ts";

const exampleInput1 = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim();

const exampleInput2 = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`.trim();

const realInput = await Deno.readTextFile("./2020/07/07.txt");

Deno.test("2020 Day 07 Part 1 - Example Input 1", () => {
  assertEquals(part1(exampleInput1), 4);
});

Deno.test("2020 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 179);
});

Deno.test("2020 Day 07 Part 2 - Example Input 1", () => {
  assertEquals(part2(exampleInput1), 32);
});

Deno.test("2020 Day 07 Part 2 - Example Input 2", () => {
  assertEquals(part2(exampleInput2), 126);
});

Deno.test("2020 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 18925);
});

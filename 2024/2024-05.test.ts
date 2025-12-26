import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2024-05.ts";

const exampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`.trim();
const realInput = await Deno.readTextFile("./2024/2024-05-input.txt");

Deno.test("2024 Day 05 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 143);
});

Deno.test("2024 Day 05 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 4281);
});

Deno.test("2024 Day 05 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 123);
});

Deno.test("2024 Day 05 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 5466);
});

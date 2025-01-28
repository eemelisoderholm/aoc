import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./10.ts";

const exampleInput = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`.trim();
const realInput = await Deno.readTextFile("./2021/10/10.txt");

Deno.test("2021 Day 10 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 26397);
});

Deno.test("2021 Day 10 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 415953);
});

Deno.test("2021 Day 10 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 288957);
});

Deno.test("2021 Day 10 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 2292863731);
});

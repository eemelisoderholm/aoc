import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./04.ts";

const exampleInput = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
`.trim();
const realInput = await Deno.readTextFile("./2018/04/04.txt");

Deno.test("2018 Day 04 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 240);
});

Deno.test("2018 Day 04 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 12169);
});

Deno.test("2018 Day 04 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 4455);
});

Deno.test("2018 Day 04 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 16164);
});

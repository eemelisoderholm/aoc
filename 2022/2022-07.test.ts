import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./2022-07.ts";

const exampleInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`.trim();
const realInput = await Deno.readTextFile("./2022/2022-07-input.txt");

Deno.test("2022 Day 07 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), 95437);
});

Deno.test("2022 Day 07 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), 1582412);
});

Deno.test("2022 Day 07 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), 24933642);
});

Deno.test("2022 Day 07 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), 3696336);
});

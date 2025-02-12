import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./06.ts";

const exampleInput = `
eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`.trim();
const realInput = await Deno.readTextFile("./2016/06/06.txt");

Deno.test("2016 Day 06 Part 1 - Example Input", () => {
  assertEquals(part1(exampleInput), "easter");
});

Deno.test("2016 Day 06 Part 1 - Real Input", () => {
  assertEquals(part1(realInput), "tzstqsua");
});

Deno.test("2016 Day 06 Part 2 - Example Input", () => {
  assertEquals(part2(exampleInput), "advent");
});

Deno.test("2016 Day 06 Part 2 - Real Input", () => {
  assertEquals(part2(realInput), "myregdnr");
});

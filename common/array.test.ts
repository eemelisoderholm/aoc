import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { A } from "./array.ts";

Deno.test("A.head", () => {
  assertEquals(A.head([0, 1, 2]), 0);
  assertEquals(A.head(["A", "B", "C"]), "A");
  assertEquals(A.head([]), undefined);
});

Deno.test("A.tail", () => {
  assertEquals(A.tail([0, 1, 2]), [1, 2]);
  assertEquals(A.tail(["A", "B", "C"]), ["B", "C"]);
  assertEquals(A.tail([]), []);
});

Deno.test("A.last", () => {
  assertEquals(A.last([0, 1, 2]), 2);
  assertEquals(A.last(["A", "B", "C"]), "C");
  assertEquals(A.last([]), undefined);
});

Deno.test("A.divide", () => {
  assertEquals(A.divide([0, 1, 2, 3]), [[0, 1], [2, 3]]);
  assertEquals(A.divide(["A", "B", "C"]), [["A", "B"], ["C"]]);
  assertEquals(A.divide([]), [[], []]);
  assertEquals(A.divide([0]), [[0], []]);
});

Deno.test("A.chunk", () => {
  assertEquals(A.chunk([0, 1, 2, 3, 4, 5], 2), [[0, 1], [2, 3], [4, 5]]);
  assertEquals(A.chunk([0, 1, 2, 3, 4, 5], 3), [[0, 1, 2], [3, 4, 5]]);
  assertEquals(A.chunk([0, 1, 2, 3], 1), [[0], [1], [2], [3]]);
  assertEquals(A.chunk([0, 1, 2, 3], 3), [[0, 1, 2], [3]]);
  assertEquals(A.chunk([0, 1, 2, 3], 100), [[0, 1, 2, 3]]);
});

Deno.test("A.transpose", () => {
  assertEquals(
    A.transpose(
      [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
    ),
    [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
    ],
  );
});

Deno.test("A.splitter", () => {
  const splitByDash = A.splitter("-");
  assertEquals(splitByDash("A-B-C"), ["A", "B", "C"]);
});

Deno.test("A.mapper", () => {
  const toNumbers = A.mapper((x: string) => parseInt(x));
  assertEquals(
    toNumbers("1,2,3".split(",")),
    [1, 2, 3],
  );
});

Deno.test("A.combinations", () => {
  assertArrayIncludes(A.combinations([1, 2, 3]), [[1, 2], [2, 3], [1, 3]]);
  assertArrayIncludes(A.combinations([1, 2, 3, 4], 3), [
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
  ]);
});

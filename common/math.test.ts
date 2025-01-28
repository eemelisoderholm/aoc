import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { M } from "./math.ts";

Deno.test("M.sum", () => {
  assertEquals(M.sum([1, 2, 3]), 6);
});

Deno.test("M.average", () => {
  assertEquals(M.average([1, 3, 2]), 2);
  assertEquals(M.average([2, 4, 6]), 4);
});

Deno.test("M.median", () => {
  assertEquals(M.median([-7, 4, 9, 1, 3]), 3);
  assertEquals(M.median([-3, 7, 8, 1, 0]), 1);
});

Deno.test("M.clamp", () => {
  assertEquals(M.clamp(100, -300, 300), 100);
  assertEquals(M.clamp(350, -300, 300), 300);
  assertEquals(M.clamp(-500, -300, 300), -300);
});

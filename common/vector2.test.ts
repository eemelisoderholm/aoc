import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { V2 } from "./vector2.ts";

Deno.test("V2.add", () => {
  assertEquals(V2.add({ x: 1, y: 2 }, { x: 1, y: 2 }), { x: 2, y: 4 });
});

Deno.test("V2.sub", () => {
  assertEquals(V2.sub({ x: 9, y: 9 }, { x: 4, y: 4 }), { x: 5, y: 5 });
});

Deno.test("V2.from", () => {
  assertEquals(V2.from(5), { x: 5, y: 5 });
  assertEquals(V2.from(5, 3), { x: 5, y: 3 });
});

Deno.test("V2.equals", () => {
  assertEquals(V2.equals({ x: 3, y: 5 }, { x: 3, y: 5 }), true);
  assertEquals(V2.equals({ x: 3, y: 5 }, { y: 5, x: 3 }), true);
  assertEquals(V2.equals({ x: 3, y: 5 }, { x: 2, y: 5 }), false);
  assertEquals(V2.equals({ x: 3, y: 5 }, { x: 3, y: 2 }), false);
});

Deno.test("V2.distance", () => {
  assertEquals(V2.distance({ x: 5, y: 2 }, { x: 5, y: 5 }), 3);
  assertEquals(V2.distance({ x: 0, y: -1 }, { x: 0, y: 0 }), 1);
});

Deno.test("V2.clamp", () => {
  assertEquals(V2.clamp({ x: 2, y: 2 }, -10, 10), { x: 2, y: 2 });
  assertEquals(V2.clamp({ x: 15, y: -19 }, -10, 10), { x: 10, y: -10 });
});

Deno.test("V2.adjacent", () => {
  assertEquals(V2.adjacent({ x: 2, y: 2 }, { x: 3, y: 3 }), true);
  assertEquals(V2.adjacent({ x: 2, y: 2 }, { x: 4, y: 4 }), false);
});

Deno.test("V2.intersection", () => {
  assertEquals(
    V2.intersection(
      { x: -10, y: -5 },
      { x: 5, y: -5 },
      { x: -2, y: -8 },
      { x: -2, y: -1 },
    ),
    { x: -2, y: -5 },
  );
  assertEquals(
    V2.intersection(
      { x: -10, y: -5 },
      { x: 5, y: -5 },
      { x: -2, y: 10 },
      { x: -2, y: -1 },
    ),
    undefined,
  );
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { V3 } from "./vector3.ts";

Deno.test("V3.add", () => {
  assertEquals(V3.add({ x: 1, y: 2, z: 4 }, { x: 1, y: 2, z: 4 }), {
    x: 2,
    y: 4,
    z: 8,
  });
});

Deno.test("V3.sub", () => {
  assertEquals(V3.sub({ x: 9, y: 9, z: 9 }, { x: 4, y: 4, z: 4 }), {
    x: 5,
    y: 5,
    z: 5,
  });
});

Deno.test("V3.from", () => {
  assertEquals(V3.from(5), { x: 5, y: 5, z: 5 });
  assertEquals(V3.from(5, 3, 1), { x: 5, y: 3, z: 1 });
});

Deno.test("V3.equals", () => {
  assertEquals(V3.equals({ x: 3, y: 5, z: 2 }, { x: 3, y: 5, z: 2 }), true);
  assertEquals(V3.equals({ x: 3, y: 5, z: 2 }, { y: 5, x: 3, z: 2 }), true);
  assertEquals(V3.equals({ x: 3, y: 5, z: 2 }, { x: 3, y: 5, z: 5 }), false);
  assertEquals(V3.equals({ x: 3, y: 5, z: 2 }, { x: 7, y: 5, z: 2 }), false);
});

Deno.test("V3.distance", () => {
  assertEquals(V3.distance({ x: 5, y: 2, z: 0 }, { x: 5, y: 5, z: 0 }), 3);
  assertEquals(V3.distance({ x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 0 }), 1);
});

Deno.test("V3.clamp", () => {
  assertEquals(V3.clamp({ x: 2, y: 2, z: 2 }, -5, 5), { x: 2, y: 2, z: 2 });
  assertEquals(V3.clamp({ x: 7, y: 9, z: 4 }, -5, 5), { x: 5, y: 5, z: 4 });
});

Deno.test("V3.adjacent", () => {
  assertEquals(
    V3.adjacent({ x: 12, y: 12, z: 12 }, { x: 13, y: 13, z: 13 }),
    true,
  );
  assertEquals(
    V3.adjacent({ x: 12, y: 12, z: 12 }, { x: 14, y: 14, z: 14 }),
    false,
  );
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { createSerializedMap } from "./serializedMap.ts";

type Vec2 = { x: number; y: number };
const vec2ToString = (v: Vec2): string => `${v.x},${v.y}`;
const vec2FromString = (s: string): Vec2 => {
  const [x, y] = s.split(",");
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
};

const Vec2Map = createSerializedMap<Vec2>(vec2ToString, vec2FromString);

Deno.test("SerializedMap", () => {
  // Constructor can take [k, v][] entries
  const mapA = new Vec2Map<number>([[{ x: 0, y: 0 }, 0]]);

  assertEquals(mapA.size, 1);
  assertEquals(mapA.has({ x: 0, y: 0 }), true);
  assertEquals(mapA.get({ x: 0, y: 0 }), 0);
  assertEquals(mapA.has({ x: 1, y: 1 }), false);
  assertEquals(mapA.get({ x: 1, y: 1 }), undefined);

  // Can add values
  mapA.set({ x: 2, y: 2 }, 4);
  assertEquals(mapA.get({ x: 2, y: 2 }), 4);
  assertEquals(mapA.size, 2);

  // Can replace values
  mapA.set({ x: 0, y: 0 }, 5);
  assertEquals(mapA.get({ x: 0, y: 0 }), 5);
  assertEquals(mapA.size, 2);

  // Can't delete non-existent
  mapA.delete({ x: 5, y: 5 });
  assertEquals(mapA.size, 2);

  // Can delete valid keys
  mapA.delete({ x: 2, y: 2 });
  assertEquals(mapA.size, 1);

  mapA.clear();
  assertEquals(mapA.size, 0);
});

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { createSerializedSet } from "./serializedSet.ts";

type Vec2 = { x: number; y: number };
const vec2ToString = (v: Vec2): string => `${v.x},${v.y}`;
const vec2FromString = (s: string): Vec2 => {
  const [x, y] = s.split(",");
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
};

const Vec2Set = createSerializedSet<Vec2>(vec2ToString, vec2FromString);

Deno.test("SerializedSet", () => {
  const setA = new Vec2Set([{ x: 0, y: 0 }]);

  assertEquals(setA.size, 1);
  assertEquals(setA.has({ x: 0, y: 0 }), true);
  assertEquals(setA.has({ x: 1, y: 1 }), false);

  // Can't add duplicate
  setA.add({ x: 0, y: 0 });
  setA.add({ y: 0, x: 0 });
  assertEquals(setA.size, 1);

  // Can add unique
  setA.add({ x: 1, y: 1 });
  assertEquals(setA.size, 2);

  // Can't delete non-existent
  setA.delete({ x: 5, y: 5 });
  assertEquals(setA.size, 2);

  // Can delete valid value
  setA.delete({ x: 1, y: 1 });
  assertEquals(setA.size, 1);

  // setA has { x: 0, y: 0 }
  const setB = new Vec2Set([{ x: 0, y: 0 }, { x: 1, y: 1 }]);

  // Can merge sets
  const setC = new Vec2Set([...setA, ...setB]);
  assertEquals(setC.size, 2);

  // Can clear sets
  setB.clear();
  assertEquals(setB.size, 0);

  // Sets don't effect each other
  assertEquals(setC.size, 2);
});

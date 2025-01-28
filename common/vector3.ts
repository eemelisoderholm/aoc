import { M } from "./math.ts";

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

const add = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
});

const sub = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z,
});

const from = (
  x: number,
  y?: number | undefined,
  z?: number | undefined,
): Vec3 => ({
  x,
  y: typeof y === "number" ? y : x,
  z: typeof z === "number" ? z : x,
});

const equals = (a: Vec3, b: Vec3): boolean =>
  a.x === b.x && a.y === b.y && a.z === b.z;

const distance = (a: Vec3, b: Vec3): number =>
  Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

const clamp = (vec: Vec3, min: number, max: number) => ({
  x: M.clamp(vec.x, min, max),
  y: M.clamp(vec.y, min, max),
  z: M.clamp(vec.z, min, max),
});

const str = (vec: Vec3): string => `(${vec.x},${vec.y},${vec.z})`;

const adjacent = (a: Vec3, b: Vec3) => distance(a, b) < 2;

export const V3 = {
  add,
  sub,
  from,
  equals,
  distance,
  clamp,
  str,
  adjacent,
};

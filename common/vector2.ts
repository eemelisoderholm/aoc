import { M } from "./math.ts";
import { createSerializedMap } from "./serializedMap.ts";
import { createSerializedSet } from "./serializedSet.ts";

export type Vec2 = {
  x: number;
  y: number;
};

const zero = { x: 0, y: 0 };

const add = (a: Vec2, b: Vec2): Vec2 => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

const sub = (a: Vec2, b: Vec2): Vec2 => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

const mul = (p: Vec2, s: number): Vec2 => ({
  x: p.x * s,
  y: p.y * s,
});

const from = (x: number, y?: number | undefined): Vec2 => ({
  x,
  y: typeof y === "number" ? y : x,
});

const max = (...vecs: Vec2[]): Vec2 =>
  vecs.reduce((acc, vec) => ({
    x: Math.max(acc.x, vec.x),
    y: Math.max(acc.y, vec.y),
  }));

const min = (...vecs: Vec2[]): Vec2 =>
  vecs.reduce((acc, vec) => ({
    x: Math.min(acc.x, vec.x),
    y: Math.min(acc.y, vec.y),
  }));

const equals = (a: Vec2, b: Vec2): boolean => a.x === b.x && a.y === b.y;

const distance = (a: Vec2, b: Vec2): number => Math.hypot(a.x - b.x, a.y - b.y);

const manhanttanDistance = (a: Vec2, b: Vec2 = zero): number =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const magnitude = (p: Vec2): number => Math.sqrt(p.x * p.x + p.y * p.y);

const normalize = (p: Vec2): Vec2 => {
  const mag = magnitude(p);
  return {
    x: mag === 0 ? 0 : p.x / mag,
    y: mag === 0 ? 0 : p.y / mag,
  };
};

const clamp = (vec: Vec2, min: number, max: number) => ({
  x: M.clamp(vec.x, min, max),
  y: M.clamp(vec.y, min, max),
});

const str = (vec: Vec2): string => `(${vec.x},${vec.y})`;

const adjacent = (a: Vec2, b: Vec2) => distance(a, b) < 2;

const cardinalDirections = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: 1 },
  west: { x: -1, y: 0 },
} as const satisfies Record<string, Vec2>;

const diagonalDirections = {
  northEast: { x: 1, y: -1 },
  southEast: { x: 1, y: 1 },
  southWest: { x: -1, y: 1 },
  northWest: { x: -1, y: -1 },
} as const satisfies Record<string, Vec2>;

const directions = {
  ...cardinalDirections,
  ...diagonalDirections,
} as const;

/**
 * Get all adjacent Vec2s that exist within the given Vec2Set,
 * around the given Vec2 position
 */
const findAdjacent = (set: Vec2Set, pos: Vec2): Vec2Set =>
  new V2Set(
    Object.values(directions)
      .map((dir) => V2.add(pos, dir))
      .filter((adj) => set.has(adj)),
  );

const turn90CCW = ({ x, y }: Vec2) => ({ x: y, y: -x });
const turn90CW = ({ x, y }: Vec2) => ({ x: -y, y: x });

const intersection = (
  a1: Vec2,
  a2: Vec2,
  b1: Vec2,
  b2: Vec2,
): Vec2 | undefined => {
  const dX = a2.x - a1.x;
  const dY = a2.y - a1.y;

  const det = dX * (b2.y - b1.y) - (b2.x - b1.x) * dY;
  if (det === 0) return undefined;

  const lambda =
    ((b2.y - b1.y) * (b2.x - a1.x) + (b1.x - b2.x) * (b2.y - a1.y)) / det;
  const gamma = ((a1.y - a2.y) * (b2.x - a1.x) + dX * (b2.y - a1.y)) / det;

  if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) {
    return undefined;
  }

  return {
    x: a1.x + lambda * dX,
    y: a1.y + lambda * dY,
  };
};

/**
 * Convert a list of direction vectors to a path of absolute positions
 *
 * @param dirs - A list of vectors representing directional movement
 * @param start - The starting position, defaulting to { x: 0, y: 0 }
 * @returns A list of absolute positions, including the starting position
 */
const directionsToPath = (dirs: Vec2[], start: Vec2 = zero): Vec2[] => {
  return dirs.reduce(
    (path, dir) => [...path, V2.add(path[path.length - 1], dir)],
    [start],
  );
};

/**
 * When given a grid path (i.e. integer vectors and 90 degree angles),
 * fills all the intermediate steps between the points in the path
 * [{0,0},{0,-3}] => [{0,0},{0,-1},{0,-2},{0,-3}]
 * @param path
 * @returns
 */
const gridPathToSteps = (path: Vec2[]): Vec2[] => {
  const filled: Vec2[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i];
    const end = path[i + 1];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const x = dx !== 0 ? dx / Math.abs(dx) : 0;
    const y = dy !== 0 ? dy / Math.abs(dy) : 0;
    filled.push(start);
    let current = { ...start };
    while (current.x !== end.x || current.y !== end.y) {
      current = { x: current.x + x, y: current.y + y };
      filled.push(current);
    }
  }
  if (path.length > 0) filled.push(path[path.length - 1]);
  return filled;
};

const gridPathDistance = (path: Vec2[], target: Vec2): number => {
  let steps = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i];
    const end = path[i + 1];

    // Check if the target point is on the current edge
    const isOnSegment = Math.min(start.x, end.x) <= target.x &&
      target.x <= Math.max(start.x, end.x) &&
      Math.min(start.y, end.y) <= target.y &&
      target.y <= Math.max(start.y, end.y);

    if (isOnSegment) {
      // Add the distance from the start of the segment to the target point
      steps += Math.abs(target.x - start.x) + Math.abs(target.y - start.y);
      return steps;
    } else {
      // Add the full length of the segment
      steps += Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    }
  }
  // If the point is not found on the path, return undefined
  throw new Error("Point is not on the path");
};

const pathIntersections = (pathA: Vec2[], pathB: Vec2[]): Vec2[] => {
  const intersections: Vec2[] = [];
  for (let i = 0; i < pathA.length - 1; i++) {
    for (let j = 0; j < pathB.length - 1; j++) {
      const intersect = intersection(
        pathA[i],
        pathA[i + 1],
        pathB[j],
        pathB[j + 1],
      );
      if (intersect) {
        intersections.push(intersect);
      }
    }
  }
  return intersections;
};

const setFromRange = (range: readonly [Vec2, Vec2]): Vec2Set => {
  const positions = new V2.Set();
  for (let x = range[0].x; x <= range[1].x; x++) {
    for (let y = range[0].y; y <= range[1].y; y++) {
      positions.add({ x, y });
    }
  }
  return positions;
};

const arrayFromRange = (range: readonly [Vec2, Vec2]): Vec2[] => {
  const positions: Vec2[] = [];
  for (let x = range[0].x; x <= range[1].x; x++) {
    for (let y = range[0].y; y <= range[1].y; y++) {
      positions.push({ x, y });
    }
  }
  return positions;
};

const inBounds = (pos: Vec2, min: Vec2, max: Vec2): boolean =>
  (pos.x >= min.x && pos.x <= max.x) &&
  (pos.y >= min.y && pos.y <= max.y);

const getBounds = (vecs: Vec2[]): [Vec2, Vec2] => [{
  x: Math.min(...vecs.map((v) => v.x)),
  y: Math.min(...vecs.map((v) => v.y)),
}, {
  x: Math.max(...vecs.map((v) => v.x)),
  y: Math.max(...vecs.map((v) => v.y)),
}];

const toString = (v: Vec2): string => `${v.x},${v.y}`;
const fromString = (s: string): Vec2 => {
  const [x, y] = s.split(",");
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
};

const V2Set = createSerializedSet<Vec2>(toString, fromString);
export type Vec2Set = InstanceType<typeof V2Set>;

/**
 * Parse given text into a Vec2Set, treating it as a grid,
 * where x is column and y is line, starting with x0y0.
 * Optionally apply the given predicate function to
 * determine whether the position is included in the set.
 */
const setFromCharGrid = (
  text: string,
  include: (char: string, pos: Vec2, set: Vec2Set) => boolean = () => true,
): Vec2Set => {
  const set = new V2.Set();
  const lines = text.split("\n");
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (include(lines[y][x], V2.from(x, y), set)) {
        set.add(V2.from(x, y));
      }
    }
  }
  return set;
};

const V2Map = createSerializedMap<Vec2>(toString, fromString);
export type Vec2Map<T> = InstanceType<typeof V2Map<T>>;

/**
 * Parse given text into a Vec2Map, treating it as a grid,
 * where x is column and y is line, starting with x0y0.
 * The given getValue function determines what value each
 * character or position produces for the map.
 * Undefined values are not included in the map at all.
 */
const mapFromCharGrid = <T>(
  text: string,
  getValue: (char: string, pos: Vec2, map: Vec2Map<T>) => T | undefined,
): Vec2Map<T> => {
  const map = new V2Map<T>();
  const lines = text.split("\n");
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const pos = V2.from(x, y);
      const value = getValue(lines[y][x], pos, map);
      if (value !== undefined) map.set(pos, value);
    }
  }
  return map;
};

export const V2 = {
  zero,
  add,
  sub,
  mul,
  max,
  min,
  from,
  equals,
  distance,
  manhanttanDistance,
  magnitude,
  normalize,
  clamp,
  str,
  adjacent,
  findAdjacent,
  cardinalDirections,
  diagonalDirections,
  directions,
  turn90CW,
  turn90CCW,
  setFromRange,
  arrayFromRange,
  inBounds,
  getBounds,
  toString,
  fromString,
  intersection,
  directionsToPath,
  gridPathToSteps,
  gridPathDistance,
  pathIntersections,
  Set: V2Set,
  setFromCharGrid,
  Map: V2Map,
  mapFromCharGrid,
};

import { createSerializedMap } from "./serializedMap.ts";
import { createSerializedSet } from "./serializedSet.ts";
import { V2, Vec2 } from "./vector2.ts";

export type Line = [Vec2, Vec2];

/**
 * Extend a line middle-out by given scalar
 * @example extend([{ x: 2, y: 2 }, { x: 4, y: 4 }], 2)
 *  => [{ x: 0, y: 0, { x: 8, y: 8 } }]
 */
function extendMiddleOut(line: Line, scalar: number): Line {
  const dir = V2.sub(line[1], line[0]);
  const length = V2.magnitude(dir);
  const factor = V2.mul(V2.normalize(dir), (scalar - 1) * length);
  const start = V2.sub(line[0], factor);
  const end = V2.add(line[1], factor);
  return [start, end];
}

const renderToTextGrid = (grid: string, line: Line): string => {
  const gridRows = grid.split("\n").map((row) => row.split(""));
  const height = gridRows.length;
  const width = gridRows[0]?.length || 0;

  const [start, end] = line;

  // Bresenham's line algorithm for grid traversal
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  const sx = start.x < end.x ? 1 : -1;
  const sy = start.y < end.y ? 1 : -1;

  let err = dx - dy;
  let x = start.x;
  let y = start.y;

  while (true) {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      const angle = Math.atan2(end.y - start.y, end.x - start.x);

      // Determine the character to use based on angle
      let char = ".";
      if (Math.abs(angle) < Math.PI / 8) {
        char = "-"; // Horizontal
      } else if (Math.abs(angle - Math.PI / 2) < Math.PI / 8) {
        char = "|"; // Vertical
      } else if (angle > 0) {
        char = "\\"; // Diagonal rising
      } else {
        char = "/"; // Diagonal falling
      }

      gridRows[y][x] = char;
    }

    if (x === end.x && y === end.y) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return gridRows.map((row) => row.join(""))
    .join("\n");
};

const toString = (v: Line): string => `${v[0].x},${v[0].y}-${v[1].x},${v[1].y}`;
const fromString = (s: string): Line => {
  const v = s.split("-").map((p) => p.split(",").map((n) => parseInt(n)));
  return [
    { x: v[0][0], y: v[0][1] },
    { x: v[1][0], y: v[1][1] },
  ];
};

const toStringUndirected = (v: Line) =>
  toString(v.toSorted(undirectedSort) as Line);

const undirectedSort = (a: Vec2, b: Vec2): number =>
  V2.toString(a).localeCompare(V2.toString(b));

const LineDSet = createSerializedSet<Line>(
  toString,
  fromString,
);
export type LineDSet = InstanceType<typeof LineDSet>;

const LineDMap = createSerializedMap<Line>(
  toString,
  fromString,
);
export type LineDMap<T> = InstanceType<typeof LineDMap<T>>;

const LineUSet = createSerializedSet<Line>(
  toStringUndirected,
  fromString,
);
export type LineUSet = InstanceType<typeof LineUSet>;

const LineUMap = createSerializedMap<Line>(
  toStringUndirected,
  fromString,
);
export type LineUMap<T> = InstanceType<typeof LineUMap<T>>;

export const LN = {
  extendMiddleOut,
  renderToTextGrid,
  SetD: LineDSet, // D (Directed): [A, B] !== [B, A]
  MapD: LineDMap,
  SetU: LineUSet, // U (Undirected): [A, B] === [B, A]
  MapU: LineUMap,
};

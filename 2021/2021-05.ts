import { V2, Vec2 } from "../common/vector2.ts";

function parseLines(input: string): [Vec2, Vec2][] {
  // Each line is separated by a line break
  return input.split("\n")
    .map((line) => {
      // Points in the line are separated by an arrow
      const [from, to] = line.split(" -> ")
        // Values of the position are separated by comma
        .map((points) => {
          const [x, y] = points.split(",")
            .map((x) => parseInt(x, 10));
          return { x, y };
        });
      return [from, to] as [Vec2, Vec2];
    });
}

type LineDirection = "horizontal" | "vertical" | "diagonal";
function getDirection([a, b]: [Vec2, Vec2]): LineDirection {
  if (a.y === b.y) return "horizontal";
  if (a.x === b.x) return "vertical";
  return "diagonal";
}
function isOrthogonal(line: [Vec2, Vec2]): boolean {
  return getDirection(line) !== "diagonal";
}

function getLineToPoints([a, b]: [Vec2, Vec2]): Vec2[] {
  const points: Vec2[] = [];
  const direction = getDirection([a, b]);
  if (direction === "vertical") {
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);
    for (let y = minY; y <= maxY; y++) {
      points.push({ x: a.x, y });
    }
    return points;
  }
  if (direction === "horizontal") {
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    for (let x = minX; x <= maxX; x++) {
      points.push({ x, y: a.y });
    }
    return points;
  }
  if (direction === "diagonal") {
    let steps = Math.abs(a.x - b.x);
    let x = a.x;
    let y = a.y;
    points.push({ x, y });
    while (steps--) {
      x += a.x > b.x ? -1 : 1;
      y += a.y > b.y ? -1 : 1;
      points.push({ x, y });
    }
  }
  return points;
}

function countOverlapPoints(lines: [Vec2, Vec2][]): number {
  const occupied: Record<string, number> = {};
  const addPoint = (pos: string) => {
    occupied[pos] = occupied[pos] ? occupied[pos] + 1 : 1;
  };
  lines.forEach((line) => {
    getLineToPoints(line).forEach((point) => {
      addPoint(V2.str(point));
    });
  });
  return Object.values(occupied).filter((count) => count > 1).length;
}

// Consider horizontal and vertical lines
// "At how many points do at least two lines overlap?"
export function part1(input: string) {
  const lines = parseLines(input);
  return countOverlapPoints(lines.filter(isOrthogonal));
}

// Consider horizontal, vertical and diagonal lines
// "At how many points do at least two lines overlap?"
export function part2(input: string) {
  const lines = parseLines(input);
  return countOverlapPoints(lines);
}

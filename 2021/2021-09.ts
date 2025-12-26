import { G } from "../common/guard.ts";
import { M } from "../common/math.ts";
import { SORT } from "../common/sort.ts";
import { V2, Vec2 } from "../common/vector2.ts";
import { Vec3 } from "../common/vector3.ts";

function parseInputAsGrid(input: string): number[][] {
  return input.split("\n").map((line) =>
    line.split("").map((char) => parseInt(char))
  );
}

function getAdjacentPositions(pos: Vec2): [Vec2, Vec2, Vec2, Vec2] {
  return [
    { y: pos.y - 1, x: pos.x }, // Top
    { y: pos.y + 1, x: pos.x }, // Bottom
    { y: pos.y, x: pos.x - 1 }, // Left
    { y: pos.y, x: pos.x + 1 }, // Right
  ];
}

function getAdjacentValues(grid: number[][], pos: Vec2): number[] {
  return getAdjacentPositions(pos)
    .map(({ x, y }) => grid[y]?.[x])
    .filter(G.isDefined);
}

function getLowPoints(grid: number[][]): Vec2[] {
  const lowPoints: Vec2[] = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const height = grid[y][x];
      const adjacent = getAdjacentValues(grid, { x, y });
      if (adjacent.every((v) => v > height)) {
        lowPoints.push({ x, y });
      }
    }
  }
  return lowPoints;
}

// TODO/FIXME: Remove repetition in getBasinSizes with this
// deno-lint-ignore no-unused-vars
function getNextPathPositions(
  grid: number[][],
  visited: Record<string, Vec2>,
  from: Vec2,
): Vec2[] {
  return getAdjacentPositions(from)
    .filter(({ x, y }) => {
      const z = grid[y]?.[x];
      if (typeof z === undefined && z >= 9) return false;
      if (V2.str({ x, y }) in visited) return false;
      return true;
    });
}

// Basin is an area bounded by 9s or grid edges. Size of the basin
// is the total amount of numbers within those boundaries.
function getBasinSizes(grid: number[][], origins: Vec2[]): number[] {
  const basinSizes: number[] = [];
  for (let i = 0; i < origins.length; i++) {
    const origin = origins[i];
    let size = 1;
    const visited: Record<string, Vec2 | Vec3> = { [V2.str(origin)]: origin };
    const unvisited: Record<string, Vec3> = Object.fromEntries(
      getAdjacentPositions(origin)
        .map(({ x, y }) =>
          [V2.str({ x, y }), { x, y, z: grid[y]?.[x] }] as [string, Vec3]
        )
        .filter(([_, v]) => G.isDefined(v.z) && v.z < 9),
    );
    while (Object.keys(unvisited).length > 0) {
      const targets = Object.entries(unvisited);
      size += targets.length;
      targets.forEach(([key, target]) => {
        getAdjacentPositions(target).map(({ x, y }) => ({
          x,
          y,
          z: grid[y]?.[x],
        }))
          .filter((p) => G.isDefined(p.z) && p.z < 9 && !(V2.str(p) in visited))
          .forEach((nextTarget) => unvisited[V2.str(nextTarget)] = nextTarget);
        visited[key] = { ...target };
        delete unvisited[key];
      });
    }
    basinSizes.push(size);
  }
  return basinSizes;
}

export function part1(input: string) {
  const grid = parseInputAsGrid(input);
  const lowPoints = getLowPoints(grid);
  const riskLevels = lowPoints.map(({ x, y }) => grid[y][x] + 1);
  return M.sum(riskLevels);
}

export function part2(input: string) {
  const grid = parseInputAsGrid(input);
  const lowPoints = getLowPoints(grid);
  const basinSizes = getBasinSizes(grid, lowPoints);
  return basinSizes.sort(SORT.descending).slice(0, 3).reduce(
    (acc, value) => acc * value,
    1,
  );
}

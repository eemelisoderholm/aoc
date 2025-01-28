import { V2, Vec2 } from "../../common/vector2.ts";

const directionMap = {
  "U": V2.cardinalDirections.north,
  "R": V2.cardinalDirections.east,
  "D": V2.cardinalDirections.south,
  "L": V2.cardinalDirections.west,
} as Record<string, Vec2>;

const parseWireDirections = (str: string): Vec2[] =>
  str.split(",").map(([d, ...val]) =>
    V2.mul(directionMap[d], parseInt(val.join("")))
  );

function parseWires(input: string): Vec2[][] {
  return input.split("\n")
    .map(parseWireDirections)
    .map((d) => V2.directionsToPath(d));
}

// Find smallest manhanttan distance to an intersection
export function part1(input: string) {
  const [wireA, wireB] = parseWires(input);
  const intersections = V2.pathIntersections(wireA, wireB)
    .filter((p) => !V2.equals(p, V2.zero));
  const distances = intersections.map((p) => V2.manhanttanDistance(p, V2.zero));
  return Math.min(...distances);
}

// Find smallest amount of combined steps to an intersection
export function part2(input: string) {
  const [wireA, wireB] = parseWires(input);
  const intersections = V2.pathIntersections(wireA, wireB)
    .filter((p) => !V2.equals(p, V2.zero));
  const steps = intersections.map((intersection) =>
    V2.gridPathDistance(wireA, intersection) +
    V2.gridPathDistance(wireB, intersection)
  );
  return Math.min(...steps);
}

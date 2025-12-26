import { A } from "../common/array.ts";
import { V2, Vec2, Vec2Set } from "../common/vector2.ts";

const directionChars = {
  "^": V2.cardinalDirections.north,
  ">": V2.cardinalDirections.east,
  "v": V2.cardinalDirections.south,
  "<": V2.cardinalDirections.west,
} as const satisfies Record<string, Vec2>;

function toDirection(char: string): Vec2 {
  const key = char as keyof typeof directionChars;
  return directionChars[key] ?? V2.cardinalDirections.north;
}

function parseDirections(input: string): Vec2[] {
  return input.split("").map(toDirection);
}

function getVisitedLocations(directions: Vec2[]): Vec2Set {
  const locations = new V2.Set();
  let currLocation: Vec2 = { x: 0, y: 0 };
  locations.add(currLocation);
  directions.forEach((dir) => {
    currLocation = V2.add(currLocation, dir);
    locations.add(currLocation);
  });
  return locations;
}

// Find how many houses are visited by following directions
export function part1(input: string) {
  const directions = parseDirections(input);
  const visited = getVisitedLocations(directions);
  return visited.size;
}

// Find how many houses are visited when two santas alternate directions
export function part2(input: string) {
  const directions = parseDirections(input);
  const partitions = A.partition(directions, (_, i) => i % 2 === 0);
  const partitionVisits = partitions.map(getVisitedLocations);
  const visited = new V2.Set(partitionVisits.flatMap((set) => [...set]));
  return visited.size;
}

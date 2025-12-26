import { M } from "../common/math.ts";
import { V2, Vec2, Vec2Map, Vec2Set } from "../common/vector2.ts";

const parseCoordinates = (input: string): Vec2[] =>
  input.split("\n").map((line) => {
    const [x, y] = line.split(", ");
    return {
      x: parseInt(x),
      y: parseInt(y),
    };
  });

// Find the coordinate closest to the position by manhanttan distance
const findClosestCoordinate = (coords: Vec2[], pos: Vec2): Vec2 | null => {
  const closestCoords = coords
    .map((coord) => ({ coord, dist: V2.manhanttanDistance(pos, coord) }))
    .sort((a, b) => a.dist - b.dist);
  // When coordinates are equidistant, there is no closest coordinate
  if (closestCoords[0].dist === closestCoords[1].dist) return null;
  return closestCoords[0].coord;
};

// Create a map of coordinates, where each coordinate contains
// a set of the positions which are closest to it
const getClosestPositionsPerCoordinate = (
  positions: Vec2Set,
  coords: Vec2[],
): Vec2Map<Vec2Set> => {
  const coordPositions = new V2.Map<Vec2Set>();
  positions.forEach((pos) => {
    const closestCoord = findClosestCoordinate(coords, pos);
    if (!closestCoord) return;

    if (!coordPositions.get(closestCoord)) {
      coordPositions.set(closestCoord, new V2.Set());
    }

    coordPositions.get(closestCoord)?.add(pos);
  });
  return coordPositions;
};

// Find all the coordinates which have an area that would extend
// infinitely (e.g. coordinates at the edges)
const getInfiniteCoordinates = (
  positions: Vec2Set,
  bounds: [Vec2, Vec2],
  coords: Vec2[],
): Vec2Set => {
  const infiniteCoords = new V2.Set();
  const innerPositions = V2.setFromRange([
    V2.add(bounds[0], { x: 1, y: 1 }),
    V2.sub(bounds[1], { x: 1, y: 1 }),
  ]);
  const edgePositions = positions.difference(innerPositions);
  edgePositions.forEach((pos) => {
    const closestCoord = findClosestCoordinate(coords, pos);
    if (!closestCoord) return;
    infiniteCoords.add(closestCoord);
  });
  return infiniteCoords;
};

// Check whether position is within given total distance to all coordinates
const isWithinRegion = (pos: Vec2, coords: Vec2[], limit = 32): boolean => {
  const distances = coords.map((coord) => V2.manhanttanDistance(pos, coord));
  return M.sum(distances) < limit;
};

// "What is the size of the largest area that isn't infinite?"
export function part1(input: string) {
  const coords = parseCoordinates(input);
  const bounds = V2.getBounds(coords);
  const positions = V2.setFromRange(bounds);
  const coordPositions = getClosestPositionsPerCoordinate(positions, coords);
  const infiniteCoords = getInfiniteCoordinates(positions, bounds, coords);
  const entries = Array.from(coordPositions.entries());
  const valid = entries.filter(([point]) => !infiniteCoords.has(point));
  const sizes = valid.map(([_, set]) => set.size);
  return Math.max(...sizes);
}

// "What is the size of the region containing all locations which have a
//  total distance to all given coordinates of less than 10000?"
export function part2(input: string, limit = 10_000) {
  const coords = parseCoordinates(input);
  const bounds = V2.getBounds(coords);
  const positions = V2.arrayFromRange(bounds);
  const region = positions.filter((pos) => isWithinRegion(pos, coords, limit));
  return region.length;
}

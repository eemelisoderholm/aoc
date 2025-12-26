import { A } from "../common/array.ts";

type Edges = [number, number, number];

const isValidTriangle = ([a, b, c]: Edges): boolean =>
  (a + b > c) && (a + c > b) && (b + c > a);

const parseLineEdges = (line: string) =>
  line.trim().split(/\s+/).map((n) => parseInt(n)) as Edges;

// Columns are read as groups of three lines
const asColumns = (edges: Edges[]) =>
  A.chunk(edges, 3).flatMap(A.transpose) as Edges[];

// Find how many lines produce valid triangles
export function part1(input: string) {
  const edges = input.split("\n").map(parseLineEdges);
  return edges.filter(isValidTriangle).length;
}

// Find how many column groups produce valid triangles
export function part2(input: string) {
  const edges = asColumns(input.split("\n").map(parseLineEdges));
  return edges.filter(isValidTriangle).length;
}

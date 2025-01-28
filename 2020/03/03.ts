import { Vec2 } from "../../common/vector2.ts";

// Count total trees (#) hit in the input while traversing
// the input with the given slope vector (y: down, x: right)
export function trees(lines: string[], slope: Vec2): number {
  let trees = 0;
  for (let y = 0, x = 0; y < lines.length; y += slope.y) {
    const line = lines[y];
    if (line[x % line.length] === "#") {
      trees++;
    }
    x += slope.x;
  }
  return trees;
}

// Find how many trees would be hit on a "3 right 1 down" slope
export function part1(input: string) {
  return trees(input.split("\n"), { x: 3, y: 1 });
}

// Find how many trees would be hit on 5 different slopes,
// multiply the results together
export function part2(input: string) {
  const lines = input.split("\n");
  const slopes: Vec2[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];
  return slopes.reduce((sum, slope) => sum * trees(lines, slope), 1);
}

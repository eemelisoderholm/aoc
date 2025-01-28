function parseDirections(input: string): number[] {
  return input.split("").map((d) => d === "(" ? 1 : -1);
}

function resolveDirections(directions: number[]): number {
  return directions.reduce((floor, dir) => floor + dir, 0);
}

function findFirstBasementInstructionPos(directions: number[]): number {
  let floor = 0;
  return directions.findIndex((dir) => {
    floor += dir;
    return floor < 0;
  });
}

// Find the final floor after following directions
export function part1(input: string) {
  const directions = parseDirections(input);
  const finalFloor = resolveDirections(directions);
  return finalFloor;
}

// Find the position of the first direction that leads to basement
export function part2(input: string) {
  const directions = parseDirections(input);
  const basementPos = findFirstBasementInstructionPos(directions);
  return basementPos + 1; // Solution is not zero-indexed
}

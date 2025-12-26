import { M } from "../common/math.ts";

type Dimensions = {
  length: number;
  width: number;
  height: number;
};

function toDimensions(line: string): Dimensions {
  const [length, width, height] = line.split("x").map((n) => parseInt(n));
  return { length, width, height };
}

function parseDimensions(input: string): Dimensions[] {
  return input.split("\n").map(toDimensions);
}

function getPerimeters({ length, width, height }: Dimensions): number[] {
  return [
    2 * (length + width),
    2 * (width + height),
    2 * (height + length),
  ];
}

function getPaperSurfaceArea(
  { length, width, height }: Dimensions,
): number {
  // "Find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l"
  const sides = [
    length * width,
    width * height,
    height * length,
  ];
  const areas = sides.map((s) => s * 2);
  // "The elves also need a little extra paper for each present:
  //  the area of the smallest side."
  const slack = Math.min(...sides);
  return M.sum([...areas, slack]);
}

function getRibbonLength({ length, width, height }: Dimensions): number {
  // "The ribbon required to wrap a present is the shortest distance
  //  around its sides, or the smallest perimeter of any one face"
  const smallestPerimeter = Math.min(
    ...getPerimeters({ length, width, height }),
  );
  // "Each present also requires a bow made out of ribbon as well;
  //  the feet of ribbon required for the perfect bow is equal to
  //  the cubic feet of volume of the present."
  const volume = length * width * height;
  return smallestPerimeter + volume;
}

// Find how many square feet of wrapping paper is required
export function part1(input: string) {
  const dimensions = parseDimensions(input);
  const areas = dimensions.map(getPaperSurfaceArea);
  const total = M.sum(areas);
  return total;
}

// Find how many feet of ribbon is required
export function part2(input: string) {
  const dimensions = parseDimensions(input);
  const lengths = dimensions.map(getRibbonLength);
  const total = M.sum(lengths);
  return total;
}

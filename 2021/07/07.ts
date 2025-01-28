import { M } from "../../common/math.ts";

function parseCrabPositions(input: string): number[] {
  return input.split(",").map((x) => parseInt(x));
}

type FuelCostFn = (distance: number) => number;
const linearFuelCost: FuelCostFn = (d) => d;
const realFuelCost: FuelCostFn = (d) => d * (d + 1) / 2;

function getMinimalFuelCostForOptimalAlignment(
  crabs: number[],
  fuelCostFn: FuelCostFn,
): number {
  const maxPos = Math.max(...crabs);
  const minPos = Math.min(...crabs);
  let minFuel = Number.MAX_VALUE;
  for (let i = minPos; i <= maxPos; i++) {
    const fuelCosts: number[] = [];
    for (let j = 0; j < crabs.length; j++) {
      fuelCosts.push(fuelCostFn(Math.abs(crabs[j] - i)));
    }
    const totalFuel = M.sum(fuelCosts);
    if (totalFuel < minFuel) minFuel = totalFuel;
  }
  return minFuel;
}

export function part1(input: string) {
  const crabs = parseCrabPositions(input);
  return getMinimalFuelCostForOptimalAlignment(crabs, linearFuelCost);
}

export function part2(input: string) {
  const crabs = parseCrabPositions(input);
  return getMinimalFuelCostForOptimalAlignment(crabs, realFuelCost);
}

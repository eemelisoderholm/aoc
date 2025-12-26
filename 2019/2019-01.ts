import { M } from "../common/math.ts";
import { P } from "../common/parse.ts";

function getRequiredFuel(mass: number, cumulative = false): number {
  const cost = Math.floor(mass / 3) - 2;
  const fuel = Math.max(0, cost);
  if (cumulative && fuel > 0) {
    return fuel + getRequiredFuel(fuel, true);
  }
  return Math.max(fuel, 0);
}

// Find the sum of fuel requirements for the modules
export function part1(input: string) {
  const masses = P.linesAsNumbers(input);
  const fuels = masses.map((mass) => getRequiredFuel(mass));
  return M.sum(fuels);
}

// Find the sum of fuel requirements for the modules,
// but while accounting for the fuel itself
export function part2(input: string) {
  const masses = P.linesAsNumbers(input);
  const fuels = masses.map((mass) => getRequiredFuel(mass, true));
  return M.sum(fuels);
}

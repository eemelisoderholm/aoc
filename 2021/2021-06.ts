import { M } from "../common/math.ts";

function parseFish(input: string): number[] {
  return input.split(",").map((x) => parseInt(x, 10));
}

/**
 * Run given amount of iterations to spawn new fish
 * @param initial Array of fish spawn times
 * @param iterations How many days to run
 * @returns Final fish counts in a record, grouped by spawn time
 */
function populate(
  initial: number[],
  iterations: number,
): Record<number, number> {
  const fish = getFishGroups(initial);
  for (let i = 0; i < iterations; i++) {
    Object.values(fish).forEach((n, i) => {
      if (i === 0) { // Group 0 spawns 8s and moves to group 6
        fish[8] += n;
        fish[6] += n;
      } else { // Other groups move one group down
        fish[i - 1] += n;
      }
      // Clear from current group, without going negative
      fish[i] = Math.max(fish[i] - n, 0);
    });
  }
  return fish;
}

/**
 * Convert array of fish spawn times into groups 0-8,
 * so that each spawn time group has the number of
 * fishes that shared the same spawn time in the array
 * [1, 1, 2, 2] -> { 0: 0, 1: 2, 2: 2, ... 8: 0 }
 * @param fish Array of fish spawn times
 * @returns Fish counts in a record, grouped by spawn time
 */
function getFishGroups(fish: number[] = []): Record<number, number> {
  const rec: Record<number, number> = Object.fromEntries(
    new Array(9).fill(0).map((v, i) => [i, v]),
  );
  fish.forEach((n) => rec[n] = rec[n] + 1);
  return rec;
}

// "How many lanternfish would there be after 80 days?"
export function part1(input: string) {
  const fish = parseFish(input);
  const iterations = 80;
  const result = populate(fish, iterations);
  return M.sum(Object.values(result));
}

// "How many lanternfish would there be after 256 days?"
export function part2(input: string) {
  const fish = parseFish(input);
  const iterations = 256;
  const result = populate(fish, iterations);
  return M.sum(Object.values(result));
}

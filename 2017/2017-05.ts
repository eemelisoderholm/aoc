/**
 * Traverse offsets until out of bounds, while incrementing
 * or decrementing each offset based on the offset value
 * @param offsets Array of offsets
 * @param threshold Minimum value for decrementing
 * @returns Total number of steps taken
 */
const run = (offsets: number[], threshold = Infinity) => {
  for (let index = 0, steps = 0;; steps++) {
    // Exit when out of bounds
    if (typeof offsets[index] === "undefined") return steps;
    // Get next offset value
    const value = offsets[index];
    // Increment or decrement last offset value
    offsets[index] += value >= threshold ? -1 : 1;
    // Jump to next offset
    index += value;
  }
};

const parseOffsets = (input: string): number[] =>
  input.split("\n").map((n) => parseInt(n));

// "How many steps does it take to reach the exit?"
export function part1(input: string) {
  const offsets = parseOffsets(input);
  const steps = run(offsets);
  return steps;
}

// Same as part1, but any offset >= 3 should decrement
export function part2(input: string) {
  const offsets = parseOffsets(input);
  const steps = run(offsets, 3);
  return steps;
}

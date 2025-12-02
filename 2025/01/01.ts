const parseRotations = (input: string): number[] =>
  input.split("\n").map((line) => {
    const match = line.match(/(L|R)(\d+)/);
    if (!match || match.length !== 3) {
      throw new Error(`Could not parse "${line}"`);
    }
    const value = parseInt(match[2]);
    return match[1] === "L" ? value * -1 : value;
  });

const DIAL_SIZE = 100;
const DIAL_INITIAL_VALUE = 50;

/**
 * Get the number of times rotation ends on 0
 */
const countFinalZeroStates = (rotations: number[]): number => {
  let value = DIAL_INITIAL_VALUE;
  let zeroes = 0;
  for (const rot of rotations) {
    value = (value + rot) % DIAL_SIZE;
    if (value < 0) value += DIAL_SIZE;
    if (value === 0) zeroes++;
  }
  return zeroes;
};

/**
 * Count the number of times 0 is hit in rotations
 */
const countAllZeroStates = (rotations: number[]): number => {
  let value = DIAL_INITIAL_VALUE;
  let zeroes = 0;

  for (const rot of rotations) {
    const start = value;

    // Add the amount of complete circles around the dial
    zeroes += Math.floor(Math.abs(rot) / DIAL_SIZE);

    // Adjust by the remaining amount
    value += rot % DIAL_SIZE;

    const remainder = value % DIAL_SIZE;
    const wrappedMax = value > DIAL_SIZE;
    const wrappedMin = value < 0 && start !== 0;
    const landedZero = remainder === 0;

    // Add one more if remainder crossed over or landed on 0
    if (wrappedMax || wrappedMin || landedZero) zeroes++;

    const normalized = (remainder + DIAL_SIZE) % DIAL_SIZE;
    value = normalized;
  }

  return zeroes;
};

export function part1(input: string) {
  const rotations = parseRotations(input);
  return countFinalZeroStates(rotations);
}

export function part2(input: string) {
  const rotations = parseRotations(input);
  return countAllZeroStates(rotations);
}

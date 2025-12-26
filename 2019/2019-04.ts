const hasDecreasingDigits = (pw: string[]) => pw.some((c, i) => c < pw[i - 1]);

const getAdjcentDuplicateGroups = (pw: string[]) =>
  pw.reduce(
    (group, char) => ({ ...group, [char]: (group[char] ?? 0) + 1 }),
    {} as Record<string, number>,
  );

const hasValidGroup = (pw: string[], predicate: (size: number) => boolean) =>
  Object.values(getAdjcentDuplicateGroups(pw)).some(predicate);

/**
 * Get the number of passwords that are valid within a given range
 * @param min Start of password range
 * @param max End of password range
 * @param exact Allow only passwords that contain a group of exactly 2 chars
 */
function validPasswordCount(min: number, max: number, exact = false): number {
  let valid = 0;
  for (let i = min; i < max; i++) {
    const pw = i.toString().split("");
    if (hasDecreasingDigits(pw)) continue;
    if (hasValidGroup(pw, (size) => exact ? size === 2 : size >= 2)) valid++;
  }
  return valid;
}

// Find the number of valid passwords within range
export function part1(input: string) {
  const [min, max] = input.split("-").map((n) => parseInt(n));
  return validPasswordCount(min, max);
}

// Find the number of valid passwords within range using stricter criteria
export function part2(input: string) {
  const [min, max] = input.split("-").map((n) => parseInt(n));
  return validPasswordCount(min, max, true);
}

function parseReports(input: string): number[][] {
  const lines = input.split("\n");
  const values = lines.map((ln) =>
    ln.split(" ").map((value) => parseInt(value))
  );
  return values;
}

/**
 * Test if given report is considered safe or not
 * @param report The array of values in the report
 * @param tolerance The amount of items that can be removed
 */
function testReportSafety(report: number[], tolerance = 0): boolean {
  for (let i = 2; i < report.length; i++) {
    // Test a sliding window of three adjacent items
    if (testWindowSafety([report[i - 2], report[i - 1], report[i]])) continue;

    // Exit recursion when there's no error tolerance
    if (tolerance === 0) return false;

    // If there's error tolerance, try removing each element
    // to see if any such change makes the report safe
    return report.some((_, j) =>
      testReportSafety(report.toSpliced(j, 1), tolerance - 1)
    );
  }
  return true;
}

/**
 * Determine if a given window of 3 values is safe
 */
function testWindowSafety(
  [a, b, c]: readonly [number, number, number],
) {
  const changeAB = a - b;
  const changeBC = b - c;

  // Lack of change is unsafe
  const hasNoChange = !changeAB || !changeBC;
  if (hasNoChange) return false;

  // Direction change is unsafe
  const hasDirectionChange = changeAB * changeBC < 0;
  if (hasDirectionChange) return false;

  // Exceeding threshold is unsafe
  const unsafeChangeThreshold = 3;
  const maxChange = Math.max(Math.abs(changeAB), Math.abs(changeBC));
  const exceedsThreshold = maxChange > unsafeChangeThreshold;
  if (exceedsThreshold) return false;

  return true;
}

// Find how many reports are considered safe
export function part1(input: string) {
  const allReports = parseReports(input);
  const safeReports = allReports.filter((r) => testReportSafety(r));
  return safeReports.length;
}

// Find how many reports are safe with one level tolerance
export function part2(input: string) {
  const allReports = parseReports(input);
  const safeReports = allReports.filter((r) => testReportSafety(r, 1));
  return safeReports.length;
}

interface PasswordWithPolicy {
  password: string;
  policy: {
    char: string;
    range: [number, number];
  };
}

function parsePasswordLine(line: string): PasswordWithPolicy {
  const words = line.split(" ");
  if (words.length !== 3) {
    throw new Error(`Could not parse "${line}": Expected 3 words`);
  }
  const range = words[0].split("-").map((x) => parseInt(x));
  if (!isFiniteNumberPair(range)) {
    throw new Error(`Could not parse "${line}": Invalid range`);
  }
  const char = words[1].charAt(0);
  if (!char) {
    throw new Error(`Could not parse "${line}": Missing policy character`);
  }
  const password = words[2];
  if (!password.length) {
    throw new Error(`Could not parse "${line}": Missing password`);
  }
  return { password, policy: { range, char } };
}

function countPolicy({ password, policy }: PasswordWithPolicy) {
  // The range is treated as min/max character treshold
  const [min, max] = policy.range;
  const total = password
    .split("")
    .filter((c) => c === policy.char).length;
  return total >= min && total <= max;
}

function positionPolicy({ password, policy }: PasswordWithPolicy) {
  // The range is treated as 1-indexed positions, of which
  // exactly one must contain the password policy character
  const match = (i: number) => password.charAt(i - 1) === policy.char;
  return policy.range.map(match).filter(Boolean).length === 1;
}

function isFiniteNumberPair(nums: number[]): nums is [number, number] {
  return (
    nums.length === 2 &&
    Number.isFinite(nums[0]) &&
    Number.isFinite(nums[1])
  );
}

// Count valid passwords by total count policy
export function part1(input: string): number {
  return input
    .split("\n")
    .map(parsePasswordLine)
    .filter(countPolicy)
    .length;
}

// Count valid passwords by position policy
export function part2(input: string): number {
  return input
    .split("\n")
    .map(parsePasswordLine)
    .filter(positionPolicy)
    .length;
}

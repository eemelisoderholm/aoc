const getRangeValidator =
  (min: number, max: number) => (v: string): boolean => {
    const n = parseInt(v);
    return n >= min && n <= max;
  };

const passportValidators = {
  byr: getRangeValidator(1920, 2002),
  iyr: getRangeValidator(2010, 2020),
  eyr: getRangeValidator(2020, 2030),
  hgt: (v) => {
    if (v.endsWith("cm")) return getRangeValidator(150, 193)(v.slice(0, -2));
    if (v.endsWith("in")) return getRangeValidator(59, 76)(v.slice(0, -2));
    return false;
  },
  hcl: (v) => /^#[0-9a-f]{6}$/.test(v),
  ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  pid: (v) => /^\d{9}$/.test(v),
} satisfies Record<string, (v: string) => boolean>;

function parsePassports(input: string): Record<string, string>[] {
  return input
    // Passports are separated by two line breaks in the input
    .split("\n\n").map(
      // Properties in the passport are separated by either spaces
      // or line breaks -> normalize separators to spaces
      (passport) =>
        passport
          .replaceAll("\n", " ")
          .split(" ")
          // Key and value of the property are separated by a colon
          .reduce((rec, pair) => {
            const [key, value] = pair.split(":");
            return { ...rec, [key]: value };
          }, {}),
    );
}

// Count the number of passports with all the required fields
export function part1(input: string) {
  const passports = parsePassports(input);
  const required = Object.keys(passportValidators);
  return passports.filter((passport) =>
    required.every((key) => key in passport)
  ).length;
}

// Count the number of valid passports
export function part2(input: string) {
  const passports = parsePassports(input);
  const validators = Object.entries(passportValidators);
  return passports.filter((passport) =>
    validators.every(([key, fn]) => key in passport && fn(passport[key]))
  ).length;
}

type State = { index: number; codes: number[]; exit?: number };
type StateFn = (state: State) => State;

const add: StateFn = ({ index, codes }) => {
  const a = codes[codes[index + 1]];
  const b = codes[codes[index + 2]];
  codes[codes[index + 3]] = a + b;
  return { index: index + 4, codes };
};

const mul: StateFn = ({ index, codes }) => {
  const a = codes[codes[index + 1]];
  const b = codes[codes[index + 2]];
  codes[codes[index + 3]] = a * b;
  return { index: index + 4, codes };
};

const exit: StateFn = (state) => ({ ...state, exit: 0 });

const fns: Record<number, StateFn> = {
  1: add,
  2: mul,
  99: exit,
};

function parse(input: string): number[] {
  return input.split(",").map((x) => parseInt(x));
}

const run: StateFn = ({ index, codes }) => {
  // console.log({ index, codes });
  const fn = fns[codes[index]];
  if (!fn) throw new Error(`Unsupported IntCode "${codes[index]}"`);
  const output = fn({ index, codes });
  return (typeof output.exit === "number") ? output : run(output);
};

// "What value is left at position 0 after the program halts?"
export function part1(input: string, skipFix = false) {
  const codes = parse(input);
  // The "fix" must only be included for the real input,
  // while the other test cases run the input as-is.
  if (!skipFix) codes.splice(1, 2, 12, 2);
  return run({ index: 0, codes }).codes[0];
}

// "Find the input "noun" and "verb" (0-100 in pos 1 and 2)
//  that cause the program to produce the output 19690720"
export function part2(input: string) {
  const initialCodes = parse(input);
  const target = 19690720;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const codes = [...initialCodes];
      codes.splice(1, 2, noun, verb);
      const output = run({ index: 0, codes });
      if (output.codes[0] === target) {
        return 100 * noun + verb;
      }
    }
  }
}

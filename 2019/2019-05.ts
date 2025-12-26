type State = {
  codes: number[];
  input: number[];
  output: number[];
  index: number;
};

// Operations mutate the state, numeric return value is an exit code
type Op = (state: State, instr: Instruction) => void | undefined | number;

type ArgMode =
  | 0 //  Position mode  - Value is used as a pointer
  | 1; // Immediate mode - Value is used as-is

type Instruction = {
  intCode: number;
  opCode: string;
  op: Op;
  modes: ArgMode[];
};

// Parse given intCode as an instruction, extracting the OpCode and ArgModes
const parseInstruction = (intCode: number): Instruction => {
  const str = intCode.toString();

  // Last two digits make up the opCode, leading zero is added
  const opCode = str.slice(-2).padStart(2, "0");

  // Find matching function for the opCode
  const op = ops[opCode];
  if (!op) throw new Error(`Unknown opCode "${opCode}" in "${str}`);

  // Other digits in the intCode describe parameter modes right-to-left
  const modes: ArgMode[] = str.slice(0, -2)
    .split("").map((c) => c === "1" ? 1 : 0)
    .toReversed(); // Make 1st mode describe 1st param
  return { intCode, opCode, op, modes };
};

// Get the next n codes as arguments for the instruction
const getArgs = (state: State, count: number): number[] =>
  new Array(count).fill(0).map((_, i) => state.codes[state.index + i + 1]);

// Resolve given args into plain values according to
// the ArgModes (dereference pointers in position mode)
const resolveArgs = (
  { codes }: State,
  { modes }: Instruction,
  args: number[],
) => args.map((v, i) => modes[i] === 1 ? v : codes[v]);

const ops = {
  // Some, but not all arguments use parameter modes.
  // x$ flags an argument that uses parameter modes,
  // and should be resolved before usage.

  // Add
  "01": (state, instr) => {
    const [a$, b$, c] = getArgs(state, 3);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.codes[c] = a + b;
    state.index += 4;
  },

  // Multiply
  "02": (state, instr) => {
    const [a$, b$, c] = getArgs(state, 3);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.codes[c] = a * b;
    state.index += 4;
  },

  // Input
  "03": (state) => {
    const [a] = getArgs(state, 1);
    state.codes[a] = state.input.pop() ?? 0;
    state.index += 2;
  },

  // Output
  "04": (state, instr) => {
    const [a$] = getArgs(state, 1);
    const [a] = resolveArgs(state, instr, [a$]);
    state.output.push(a);
    state.index += 2;
  },

  // Jump if truthy
  "05": (state, instr) => {
    const [a$, b$] = getArgs(state, 2);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.index = a !== 0 ? b : state.index + 3;
  },

  // Jump if false
  "06": (state, instr) => {
    const [a$, b$] = getArgs(state, 2);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.index = a === 0 ? b : state.index + 3;
  },

  // Less than
  "07": (state, instr) => {
    const [a$, b$, c] = getArgs(state, 3);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.codes[c] = a < b ? 1 : 0;
    state.index += 4;
  },

  // Equals
  "08": (state, instr) => {
    const [a$, b$, c] = getArgs(state, 3);
    const [a, b] = resolveArgs(state, instr, [a$, b$]);
    state.codes[c] = a === b ? 1 : 0;
    state.index += 4;
  },

  // Exit
  "99": () => 0,
} as Record<string, Op>;

// Initialize the state and run instructions until there is a return code
function run(codes: number[], input: number[]): State {
  const state: State = { codes, input, output: [], index: 0 };
  while (true) {
    const code = codes[state.index];
    if (!code) throw new Error(`Could not find code at index "${state.index}"`);
    const instruction = parseInstruction(code);
    const result = instruction.op(state, instruction);
    if (typeof result === "number") break;
  }
  return state;
}

// Read input as a list of numbers
const parseCodes = (input: string) => input.split(",").map((x) => parseInt(x));

// "After providing 1 to the only input instruction and passing all the tests,
//  what diagnostic code does the program produce?"
export function part1(input: string) {
  const codes = parseCodes(input);
  const state = run(codes, [1]);
  return state.output.pop();
}

// "What is the diagnostic code for system ID 5?"
export function part2(input: string) {
  const codes = parseCodes(input);
  const state = run(codes, [5]);
  return state.output.pop();
}

const ops = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
  NOT: (a) => a ^ 0xFFFF,
  SET: (a) => a,
} as const satisfies Record<string, (a: number, b: number) => number>;

type OpCode = keyof typeof ops;

const opCodes = Object.keys(ops) as OpCode[];

type Instruction = { op: OpCode; args: string[]; target: string };

const parseInstruction = (line: string): Instruction => {
  const [head, target] = line.split(" -> ");
  const args = head.split(" ");

  // SET op represents the assignment instruction (no opcode in input)
  if (args.length === 1) return { op: "SET", target, args };

  // NOT op has the opCode before parameters
  if (args[0] === "NOT") return { op: "NOT", target, args: [args[1]] };

  // Rest of the instructions follow "a OPCODE b -> c" format
  if (args.length !== 3) throw new Error(`Expected 3 arguments in "${line}"`);
  const op = args[1] as OpCode;
  if (!opCodes.includes(op)) throw new Error(`Invalid opCode in "${line}"`);
  return { op, args: [args[0], args[2]], target };
};

type Wires = Record<string, number>;

// Get signal from the given wire, or use a numeric wire key as a signal
// Undefined result indicates there is no signal (i.e. wire isn't ready)
const getSignal = (arg: string, wires: Wires): number | undefined => {
  const wire = wires[arg];
  if (typeof wire !== "undefined") return wire;
  const int = parseInt(arg);
  if (Number.isInteger(int)) return int;
};

const runInstructions = (
  instructions: Instruction[],
  wires: Wires = {},
): Wires => {
  for (const instr of instructions) {
    // Wire may only receive a signal once, skip replacing instructions
    if (typeof wires[instr.target] !== "undefined") continue;

    // Convert parameters to signals ['a', '8'] => [5, 8]
    const signals = instr.args.map((arg) => getSignal(arg, wires));

    // In case of any missing signals, defer the instruction to the end
    if (signals.some((signal) => typeof signal === "undefined")) {
      instructions.push(instr);
      continue;
    }

    // Set the signal of the target wire to the result of the operation
    const [a, b] = signals as [number, number];
    wires[instr.target] = ops[instr.op](a, b);
  }
  return wires;
};

// Find which signal is ultimately provided to wire a
export function part1(input: string) {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);
  const wires = runInstructions(instructions);
  return wires.a;
}

// Override wire b signal with wire a result and rerun
export function part2(input: string) {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);
  const wires1 = runInstructions(instructions);
  const wires2 = runInstructions(instructions, { b: wires1.a });
  return wires2.a;
}

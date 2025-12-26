type Operation = "acc" | "jmp" | "nop";
type Instruction = [Operation, number];

function parseInstructions(input: string): Instruction[] {
  return input.split("\n").map((line) => {
    const [op, arg] = line.split(" ");
    return [op, parseInt(arg)] as [Operation, number];
  });
}

type ExecContext = {
  instructions: Instruction[]; // Full list of instructions from input
  visited?: Set<number>; // Previous indexes to detect loops
  accumulator?: number; // Current accumulator value
  repair?: boolean; // Do the jmp <-> nop repair flip
  repaired?: boolean; // Flip performed in this branch
};

type ExecResult = { accumulator: number; exitReason: "loop" | "end" };

// Recursively execute instructions until a result is reached
function exec(context: ExecContext, index = 0): ExecResult {
  const ctx = {
    ...context,
    visited: new Set(context.visited),
    accumulator: context.accumulator ?? 0,
  };

  if (index >= ctx.instructions.length) {
    // End of instructions reached
    return { accumulator: ctx.accumulator, exitReason: "end" };
  }
  if (ctx.visited.has(index)) {
    // Instruction already executed
    return { accumulator: ctx.accumulator, exitReason: "loop" };
  }

  ctx.visited.add(index);
  const [op, val] = ctx.instructions[index];
  const acc = ctx.accumulator;

  const fns = {
    jmp: (c = ctx) => exec(c, index + val),
    nop: (c = ctx) => exec(c, index + 1),
    acc: (c = ctx) => exec({ ...c, accumulator: acc + val }, index + 1),
  };

  const result = fns[op]();

  // Basic case, run instruction as-is if repairing isn't
  // requested, or is already performed in this branch
  if (!ctx.repair || ctx.repaired || op === "acc") return result;

  // Branch already terminates without loops
  if (result.exitReason === "end") return result;

  // Repair by flipping the instruction
  return fns[op === "jmp" ? "nop" : "jmp"]({ ...ctx, repaired: true });
}

// Find accumulator value before any instruction is executed twice
export function part1(input: string) {
  const instructions = parseInstructions(input);
  return exec({ instructions }).accumulator;
}

// Find accumulator value while repairing the instructions by
// flipping one jmp to nop or vice versa, and reaching the
// end of instructions list
export function part2(input: string) {
  const instructions = parseInstructions(input);
  return exec({ instructions, repair: true }).accumulator;
}

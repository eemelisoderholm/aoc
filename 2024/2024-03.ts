import { M } from "../common/math.ts";

type State = {
  program: string; // The corrupted memory of the computer
  index: number; // Position at the end of current instruction
  mulSkip: boolean; // Control if mul instructions should be ignored
  outputs: number[]; // Any values output during runtime
};

type Options = {
  supportMulSkip?: boolean;
};

function run(program: string, opts: Options = {}): State {
  const state: State = {
    program,
    index: 0,
    mulSkip: false,
    outputs: [],
  };
  while (state.index < state.program.length) {
    // Seek the next part that resembles a valid instruction
    const commonInstructionPattern = /[a-z']{2,10}\(\d{0,10}(,\d{0,10})*\)/;
    const remainingProgram = state.program.substring(state.index);
    const match = commonInstructionPattern.exec(remainingProgram);

    // If nothing ahead looks like a valid instruction, we are done
    if (!match) return state;

    // Valid instruction format, but may not be supported instruction,
    // and may have garbage in front i.e. foomul(12,34) or foobar()
    const instr = match[0];

    // Grab the arguments between parentheses "(123,321)"" -> ["123", "321"]
    const arg = instr.substring(instr.indexOf("(") + 1, instr.indexOf(")"));
    const args = arg ? arg.split(",") : [];

    if (instr.includes("mul(") && !state.mulSkip) {
      // Mul instruction must have exactly two 1-3 digit parameters
      const params = args
        .filter((arg) => arg.length >= 1 && arg.length <= 3)
        .map((arg) => parseInt(arg))
        .filter(Number.isFinite);
      if (params.length === 2) {
        state.outputs.push(params[0] * params[1]);
      }
    }

    if (instr.includes("don't(") && args.length === 0 && opts.supportMulSkip) {
      state.mulSkip = true;
    }

    if (instr.includes("do(") && args.length === 0 && opts.supportMulSkip) {
      state.mulSkip = false;
    }

    // Move ahead in the program
    state.index += match.index + instr.length;
  }

  return state;
}

// Find the result of running all uncorrupted mul instructions
export function part1(input: string) {
  const state = run(input);
  return M.sum(state.outputs);
}

// Find the result of running all uncorrupted mul instructions, but
// the do()/don't() instructions enable/disable the mul instruction
export function part2(input: string) {
  const state = run(input, { supportMulSkip: true });
  return M.sum(state.outputs);
}

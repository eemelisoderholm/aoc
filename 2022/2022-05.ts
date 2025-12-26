function parseStacks(input: string): Record<string, string[]> {
  // Only pick the stack definition section
  const section = input.split("\n\n")[0];
  // Reverse the lines, so first line defines the stack keys
  // and the stack items are sorted bottom-up
  const lines = section.split("\n").toReversed();
  // Create a record for all the stacks in the input
  const stacks: Record<string, string[]> = Object.fromEntries(
    lines[0].split("   ").map((x) => [parseInt(x), []]),
  );
  // Add characters from all the lines to the stacks
  Object.keys(stacks).forEach((key, i) => {
    const stack = stacks[key];
    //    [A] [B]..
    //[C] [D] [E]..
    //-^---^---^...
    // 1   5   9... (char positions)
    const column = 1 + (i * 4);
    lines.slice(1).forEach((line) => {
      const char = line.charAt(column).trim();
      if (char) {
        stack.push(char);
      }
    });
  });
  return stacks;
}

type Move = { amount: number; from: number; to: number };

function parseMoves(input: string): Move[] {
  // Skip the stack definitions
  const section = input.split("\n\n")[1];
  // Moves are defined as:
  //   move 1 from 2 to 1
  //   move 3 from 1 to 3
  //   ...
  const lines = section.split("\n");
  return lines.map((line) => {
    const parts = line.split(" ");
    return {
      amount: parseInt(parts[1], 10),
      from: parseInt(parts[3], 10),
      to: parseInt(parts[5], 10),
    };
  });
}

// Moving crates one by one according to the move list:
// "What crate ends up on top of each stack?"
export function part1(input: string) {
  const stacks = parseStacks(input);
  const moves = parseMoves(input);
  moves.forEach((move) => {
    new Array(move.amount).fill(null).forEach(() => {
      const lifted = stacks[move.from].splice(-1, 1);
      stacks[move.to] = [...stacks[move.to], ...lifted];
    });
  });
  return Object.values(stacks).map((stack) => stack.at(-1)).join("");
}

// Moving crates as stacks according to the move list
// "What crate ends up on top of each stack?"
export function part2(input: string) {
  const stacks = parseStacks(input);
  const moves = parseMoves(input);
  moves.forEach((move) => {
    const lifted = stacks[move.from].splice(move.amount * -1, move.amount);
    stacks[move.to] = [...stacks[move.to], ...lifted];
  });
  return Object.values(stacks).map((stack) => stack.at(-1)).join("");
}

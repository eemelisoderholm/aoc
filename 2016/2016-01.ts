import { V2, Vec2 } from "../common/vector2.ts";

type Instruction = { turn: "L" | "R"; steps: number };

function parseInstruction(instr: string): Instruction {
  const match = instr.match(/([LR])(\d+)/);
  if (!match) throw new Error(`Invalid instruction: ${instr}`);
  return {
    turn: match[1] as "L" | "R",
    steps: parseInt(match[2]),
  };
}

function walk(start: Vec2, instructions: Instruction[]): {
  finalPosition: Vec2;
  firstRepeatedPosition: Vec2;
} {
  let direction: Vec2 = V2.cardinalDirections.north;
  let position: Vec2 = { ...start };
  let firstRepeatedPosition: Vec2 | null = null;
  const visited = new V2.Set();
  for (const { turn, steps } of instructions) {
    // Turn clockwise or counter-clockwise based on the instruction
    if (turn === "L") direction = V2.turn90CCW(direction);
    if (turn === "R") direction = V2.turn90CW(direction);
    // Walk each step (could multiply direction if we don't care about pos)
    for (let i = 1; i <= steps; i++) {
      position = V2.add(position, direction);
      // Add the locations to a set until first repeated position is found
      if (!firstRepeatedPosition) {
        if (visited.has(position)) {
          firstRepeatedPosition = position;
        } else {
          visited.add(position);
        }
      }
    }
  }
  return {
    finalPosition: position,
    firstRepeatedPosition: firstRepeatedPosition ?? position,
  };
}

const startPosition = { x: 0, y: 0 };

// Find how many blocks away is the final position?
export function part1(input: string) {
  const instructions = input.split(", ").map(parseInstruction);
  const { finalPosition } = walk(startPosition, instructions);
  return V2.manhanttanDistance(startPosition, finalPosition);
}

// Find how many blocks away is the first position visited twice
export function part2(input: string) {
  const instructions = input.split(", ").map(parseInstruction);
  const { firstRepeatedPosition } = walk(startPosition, instructions);
  return V2.manhanttanDistance(startPosition, firstRepeatedPosition);
}

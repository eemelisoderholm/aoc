import { V2, Vec2, Vec2Map } from "../../common/vector2.ts";

const instructionMap = {
  "U": V2.cardinalDirections.north,
  "R": V2.cardinalDirections.east,
  "D": V2.cardinalDirections.south,
  "L": V2.cardinalDirections.west,
} as Record<string, Vec2>;

function parseInstructions(input: string): Vec2[][] {
  return input.split("\n").map((line) =>
    line.split("").map((c) => instructionMap[c])
  );
}

function getCode(
  instructions: Vec2[][],
  { start, buttons }: Keypad,
): string {
  let code = "";
  let position: Vec2 = { ...start };
  for (const line of instructions) {
    for (const direction of line) {
      const next = V2.add(position, direction);
      if (buttons.has(next)) position = next;
    }
    code += buttons.get(position) ?? "?";
  }
  return code;
}

type Keypad = {
  start: Vec2;
  buttons: Vec2Map<string>;
};

const simpleKeypad: Keypad = {
  start: { x: 0, y: 0 },
  buttons: new V2.Map<string>([
    [{ x: -1, y: -1 }, "1"],
    [{ x: 0, y: -1 }, "2"],
    [{ x: 1, y: -1 }, "3"],
    [{ x: -1, y: 0 }, "4"],
    [{ x: 0, y: 0 }, "5"],
    [{ x: 1, y: 0 }, "6"],
    [{ x: -1, y: 1 }, "7"],
    [{ x: 0, y: 1 }, "8"],
    [{ x: 1, y: 1 }, "9"],
  ]),
};

// Find the code following instructions on the simple keypad
export function part1(input: string): string {
  const instructions = parseInstructions(input);
  return getCode(instructions, simpleKeypad);
}

const complexKeypad: Keypad = {
  start: { x: -2, y: 0 },
  buttons: new V2.Map<string>([
    [{ x: 0, y: -2 }, "1"],
    [{ x: -1, y: -1 }, "2"],
    [{ x: 0, y: -1 }, "3"],
    [{ x: 1, y: -1 }, "4"],
    [{ x: -2, y: 0 }, "5"],
    [{ x: -1, y: 0 }, "6"],
    [{ x: 0, y: 0 }, "7"],
    [{ x: 1, y: 0 }, "8"],
    [{ x: 2, y: 0 }, "9"],
    [{ x: -1, y: 1 }, "A"],
    [{ x: 0, y: 1 }, "B"],
    [{ x: 1, y: 1 }, "C"],
    [{ x: 0, y: 2 }, "D"],
  ]),
};

// Find the code following instructions on the complex keypad
export function part2(input: string): string {
  const instructions = parseInstructions(input);
  return getCode(instructions, complexKeypad);
}

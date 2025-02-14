import { M } from "../../common/math.ts";
import { V2, Vec2, Vec2Map } from "../../common/vector2.ts";

type Instruction =
  | { type: "OFF"; range: readonly [Vec2, Vec2] }
  | { type: "ON"; range: readonly [Vec2, Vec2] }
  | { type: "TOGGLE"; range: readonly [Vec2, Vec2] };

const parseVec2 = (s: string): Vec2 => {
  const [x, y] = s.split(",").map((n) => parseInt(n));
  return { x, y };
};

const parseRange = (line: string): readonly [Vec2, Vec2] => {
  const match = line.match(/(\d{1,3},\d{1,3})/g);
  const start = parseVec2(match?.[0] ?? "0,0");
  const end = parseVec2(match?.[1] ?? "0,0");
  return [start, end];
};

function parseInstruction(line: string): Instruction {
  const range = parseRange(line);
  if (line.includes("toggle")) return { type: "TOGGLE", range };
  if (line.includes("off")) return { type: "OFF", range };
  return { type: "ON", range };
}

function applyFlipInstructions(
  lights: Vec2Map<boolean>,
  instructions: Instruction[],
): Vec2Map<boolean> {
  instructions.forEach((instr) => {
    const positions = V2.setFromRange(instr.range);
    positions.forEach((pos) => {
      const val = lights.get(pos) ?? false;
      switch (instr.type) {
        case "OFF":
          lights.set(pos, false);
          break;
        case "ON":
          lights.set(pos, true);
          break;
        case "TOGGLE":
          lights.set(pos, !val);
          break;
      }
    });
  });
  return lights;
}

function applyBrightnessInstructions(
  lights: Vec2Map<number>,
  instructions: Instruction[],
): Vec2Map<number> {
  instructions.forEach((instr) => {
    const positions = V2.setFromRange(instr.range);
    positions.forEach((pos) => {
      const val = lights.get(pos) ?? 0;
      switch (instr.type) {
        case "OFF":
          lights.set(pos, Math.max(val - 1, 0));
          break;
        case "ON":
          lights.set(pos, val + 1);
          break;
        case "TOGGLE":
          lights.set(pos, val + 2);
          break;
      }
    });
  });
  return lights;
}

// TODO: The brute force is slow, do something more efficient

export function part1(input: string) {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);
  const lights = new V2.Map<boolean>();
  const state = applyFlipInstructions(lights, instructions);
  return Array.from(state.values()).filter(Boolean).length;
}

export function part2(input: string) {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);
  const lights = new V2.Map<number>();
  const state = applyBrightnessInstructions(lights, instructions);
  return M.sum(Array.from(state.values()));
}

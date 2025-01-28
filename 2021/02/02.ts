import { V2, Vec2 } from "../../common/vector2.ts";
import { V3, Vec3 } from "../../common/vector3.ts";

/**
 * Transform instruction to a change vector
 * forward 5 -> { x: 5, y:  0 }
 * up 3      -> { x: 0, y: -3 }
 * @param instr instruction line from input
 * @returns change Vec2
 */
const parseInstruction = (instr: string): Vec2 => {
  const [direction, param] = instr.split(" ");
  const amount = parseInt(param);
  switch (direction) {
    case "forward":
      return { x: amount, y: 0 };
    case "up":
      return { x: 0, y: -amount };
    case "down":
      return { x: 0, y: amount };
    default:
      throw new Error(`Unknown direction ${direction}`);
  }
};

/**
 * Apply change Vec2 to pos Vec3 so that
 * change.y: Adds magnitude to aim Z
 * change.x: Adds magnitude to position X AND
 *           Adds magnitude * aim Z to depth Y
 * @returns new position Vec3
 */
function move(pos: Vec3, change: Vec2): Vec3 {
  return {
    x: pos.x + change.x,
    y: pos.y + (pos.z * change.x),
    z: pos.z + change.y,
  };
}

// Find final position while treating up/down as depth changes
export function part1(input: string) {
  const lines = input.split("\n");
  const pos = lines.map(parseInstruction).reduce(V2.add, V2.from(0));
  return pos.x * pos.y;
}

// Find final position while treating up/down as aim changes
export function part2(input: string) {
  const lines = input.split("\n");
  const pos = lines.map(parseInstruction).reduce(move, V3.from(0));
  return pos.x * pos.y;
}

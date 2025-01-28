import { V2, Vec2 } from "../../common/vector2.ts";

/**
 * Turn the input lines into vectors representing movement
 * U 5 \n R 3 -> [{ x: 0, y: -5 }, { x: 3, y: 0 }]
 */
function parseInputAsMoves(input: string): Vec2[] {
  return input.trim().split("\n").map((line) => {
    const [a, b] = line.trim().split(" ");
    const mag = parseInt(b);
    switch (a) {
      case "U":
        return { x: 0, y: mag * -1 };
      case "D":
        return { x: 0, y: mag };
      case "L":
        return { x: mag * -1, y: 0 };
      case "R":
      default:
        return { x: mag, y: 0 };
    }
  });
}

/**
 * Turn a movement vector into a series of 1 step vectors
 * { x: 0, y: -2 } -> [{ x: 0, y: -1 }, { x: 0, y: -1 }]
 */
const moveToSteps = (move: Vec2): Vec2[] => {
  const amount = Math.abs(move.x !== 0 ? move.x : move.y);
  return new Array(amount).fill(V2.clamp(move, -1, 1));
};

/**
 * Move a rope by its head, with the other segments trailing.
 * @param rope Vec2[] representing rope positions
 * @param step Vec2 representing a single move for head
 * @returns Vec2[] representing updated rope positions
 */
function moveRopeByHead(rope: Vec2[], step: Vec2): Vec2[] {
  const newRope: Vec2[] = [];
  for (let i = 0; i < rope.length; i++) {
    // The head of the rope simply moves by the step
    if (i === 0) {
      newRope.push(V2.add(rope[0], step));
      continue;
    }
    // The other segments trail, so they only move if they'd
    // no longer be touching the knot that is ahead of them
    newRope.push(trail(newRope[i - 1], rope[i]));
  }
  return newRope;
}

/**
 * Trail the knot move ahead, moving by a single unit only
 * if the distance grows to more one unit
 * @param to Position the knot ahead moved to
 * @param pos Current position of this knot
 * @returns New position for this knot
 */
function trail(to: Vec2, pos: Vec2): Vec2 {
  if (Math.floor(V2.distance(to, pos)) <= 1) {
    return pos;
  }
  return V2.add(pos, V2.clamp(V2.sub(to, pos), -1, 1));
}

function totalUniqueTailPositionsFromRopeMoves(
  input: string,
  ropeLength: number,
) {
  // Get a complete list of moves as single unit steps
  const steps = parseInputAsMoves(input).map(moveToSteps).flat();
  const tailPositions = new Set();
  let rope = new Array(ropeLength).fill(V2.from(0)) as Vec2[];
  // Apply each of the steps as moves to the rope
  steps.forEach((step) => {
    rope = moveRopeByHead(rope, step);
    // Save the current tail position
    tailPositions.add(V2.str(rope[rope.length - 1]));
  });
  return tailPositions.size;
}

export function part1(input: string) {
  return totalUniqueTailPositionsFromRopeMoves(input, 2);
}

export function part2(input: string) {
  return totalUniqueTailPositionsFromRopeMoves(input, 10);
}

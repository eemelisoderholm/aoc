import { M } from "../common/math.ts";
import { V2, Vec2, Vec2Map } from "../common/vector2.ts";

/**
 * Create a spiral pattern of given length, turning counter-clockwise,
 * with the sum of neighbouring values in each position. Maximum value
 * is limited to the first value greater than the length of the spiral.
 *
 * 147  142  133  122   59
 * 304    5    4    2   57
 * 330   10    1    1   54
 * 351   11   23   25   26
 * 362  747  806--->   ...
 *
 * @returns position: Vec2 of the final position, value: first adjacency
 * sum exceeding the length of the spiral
 */
function spiral(length: number): { position: Vec2; value: number } {
  let pos: Vec2 = { x: 0, y: 0 };
  let sum = 0;

  // Side represents a horizontal or vertical segment of numbers
  let side: Vec2Map<number> = new V2.Map([[pos, 1]]);
  const prevSides: Vec2Map<number>[] = [];

  let dir: Vec2 = V2.cardinalDirections.south;

  for (let i = 0; i < length; i++) {
    // Get position next to the current item on the inner side
    // Example: Moving right (x+1), inner side is above (y-1)
    //  . . .    . . .    . . .
    //  . ^      . . ^    . . . ^
    const innerPos = V2.add(pos, V2.turn90CCW(dir));

    if (!prevSides.some((side) => side.has(innerPos))) {
      // Turn when the inner side no longer has a position
      dir = V2.turn90CCW(dir);

      // Positions further than 4 sides in become irrelevant
      if (prevSides.length > 4) prevSides.shift();

      // Start building a new side after each turn
      prevSides.push(side);
      side = new V2.Map();
    }

    pos = V2.add(pos, dir);

    if (sum <= length) {
      // Find existing values within any adjacent positions
      const adjacent = Object.values(V2.directions).map((p) => V2.add(pos, p));
      const values: number[] = [];
      const allSides = [side, ...prevSides];
      adjacent.forEach((pos) => {
        allSides.forEach((side) => {
          const val = side.get(pos);
          if (val) values.push(val);
        });
      });
      sum = M.sum(values);
    }

    side.set(pos, sum);
  }

  return { position: pos, value: sum };
}

export function part1(input: string) {
  const num = parseInt(input);
  const { position } = spiral(num);
  return V2.manhanttanDistance(position) - 1;
}

export function part2(input: string) {
  const num = parseInt(input);
  return spiral(num).value;
}

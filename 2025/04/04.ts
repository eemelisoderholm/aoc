import { V2, Vec2Set } from "../../common/vector2.ts";

const parseInputRolls = (input: string): Vec2Set =>
  V2.setFromCharGrid(input, (char) => char === "@");

// "Fewer than four rolls of paper in the eight adjacent positions"
const getAccessibleRolls = (rolls: Vec2Set): Vec2Set =>
  rolls.filter((roll) => V2.findAdjacent(rolls, roll).size < 4);

// Recursively find how many total rolls can be removed,
// by doing multiple sweeps of removing all accessible rolls
const getRemovableRollCount = (rolls: Vec2Set, count = 0): number => {
  const removable = getAccessibleRolls(rolls);
  const remaining = rolls.difference(removable);
  return remaining.size > 0 && removable.size > 0
    ? getRemovableRollCount(remaining, count + removable.size)
    : count;
};

// "How many rolls of paper can be accessed by a forklift?"
export function part1(input: string) {
  const rolls = parseInputRolls(input);
  return getAccessibleRolls(rolls).size;
}

// "How many rolls of paper in total can be removed?"
export function part2(input: string) {
  const rolls = parseInputRolls(input);
  return getRemovableRollCount(rolls);
}

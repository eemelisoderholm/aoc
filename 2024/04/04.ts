import { V2, Vec2, Vec2Map } from "../../common/vector2.ts";

type CharGrid = Vec2Map<string>; // Map<Position, Character>

function parseCharGrid(input: string): CharGrid {
  const grid: CharGrid = new V2.Map();
  const lines = input.split("\n");
  const chars = lines.map((ln) => ln.split(""));
  chars.forEach((row, x) => {
    row.forEach((char, y) => {
      grid.set({ x, y }, char);
    });
  });
  return grid;
}

/**
 * Test if a direction (i.e. {x: 1, y: -1} for ↗) contains a word,
 * starting from the given position in the character grid
 * @returns Last character position vector, if the word is found
 */
function checkWordInDirection(
  word: string,
  start: Vec2,
  direction: Vec2,
  grid: CharGrid,
): Vec2 | undefined {
  let pos = start;
  for (let i = 0; i < word.length; i++) {
    if (grid.get(pos) !== word[i]) return;
    pos = V2.add(pos, direction);
  }
  return V2.sub(pos, direction);
}

/**
 * Look for all instances of a word in a character grid,
 * checking vertical, horizontal and diagonal directions
 * @returns Array of [start, end] position vector tuples
 */
function findWordInGrid(grid: CharGrid, word: string): [Vec2, Vec2][] {
  const directions: Vec2[] = [
    ...Object.values(V2.cardinalDirections),
    ...Object.values(V2.diagonalDirections),
  ];
  const wordLines: [Vec2, Vec2][] = [];
  for (const [pos, char] of grid.entries()) {
    // Skip if cell doesn't have the starting character
    if (char !== word[0]) continue;

    // Test each direction for a word line
    for (const dir of directions) {
      const end = checkWordInDirection(word, pos, dir, grid);
      if (end) wordLines.push([pos, end]);
    }
  }
  return wordLines;
}

/**
 * Test if the given position in a character grid is the center
 * point of two "MAS" texts in the shape of an X, meaning:
 * M#M    S#M    M#S
 * #A# or #A# or #A# etc.
 * S#S    S#M    M#S
 */
function checkDoubleDiagonalMAS(pos: Vec2, grid: CharGrid) {
  const diagonalNeighbors = getDiagonalNeighborPositions(pos);
  const [ne, se, sw, nw] = diagonalNeighbors.map((p) => grid.get(p));
  let found = 0;
  if (ne === "M" && sw === "S") found++; // ↙
  if (sw === "M" && ne === "S") found++; // ↗
  if (se === "M" && nw === "S") found++; // ↖
  if (nw === "M" && se === "S") found++; // ↘
  return found === 2;
}

/**
 * Get four diagonal position vectors around the given point
 * i.e. 5,5 => [4,4, 6,4, 4,6, 6,6]
 */
function getDiagonalNeighborPositions(pos: Vec2): Vec2[] {
  return Object.values(V2.diagonalDirections).map((dir) => V2.add(pos, dir));
}

// Find how many times "XMAS" appears in the grid
export function part1(input: string) {
  const grid = parseCharGrid(input);
  const xmases = findWordInGrid(grid, "XMAS");
  return xmases.length;
}

// Find how many times "MAS" appears in the shape of an X in the grid
export function part2(input: string) {
  const grid = parseCharGrid(input);
  const result = [...grid.entries()]
    .filter(([_, char]) => char === "A")
    .filter(([pos]) => checkDoubleDiagonalMAS(pos, grid));
  return result.length;
}

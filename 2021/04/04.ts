import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";

interface BingoBoard {
  rows: number[][];
  winScore?: number;
  winRound?: number;
}

function parseNumbers(input: string): number[] {
  // First line of input contains the bingo numbers, comma separated
  return input.split("\n")[0].split(",").map((x) => parseInt(x, 10));
}

function parseBoards(input: string): BingoBoard[] {
  // Boards are separated by two line breaks
  return input.split("\n\n")
    // First segment is skipped as it's the bingo numbers
    .filter((_, i) => i !== 0)
    // Board rows are separated by single line breaks
    .map((board) => ({
      rows: board.split("\n")
        // Numbers on the row are separated by 1-2 spaces
        .map((row) =>
          row.split(" ")
            .map((v) => v.trim())
            .filter(Boolean)
            .map((value) => parseInt(value.trim(), 10))
        ),
    }));
}

function hasBingo(numbers: number[], board: BingoBoard): boolean {
  // Turn board columns into additional rows for a single sweep
  const rows = [...board.rows, ...A.transpose(board.rows)];
  return rows.some((row) => row.every((value) => numbers.includes(value)));
}

function resolveRounds(numbers: number[], boards: BingoBoard[]): BingoBoard[] {
  for (let i = 0; i < numbers.length; i++) {
    // All the valid numbers for the current round
    const nums = numbers.slice(0, i + 1);
    for (let j = 0; j < boards.length; j++) {
      // Skip already resolved boards and non-winning boards
      if (typeof boards[j].winRound !== "undefined") continue;
      if (!hasBingo(nums, boards[j])) continue;

      // Calculate score and flag a board as winning
      const unmarked = boards[j].rows.flat().filter((v) => !nums.includes(v));
      boards[j].winScore = M.sum(unmarked) * numbers[i];
      boards[j].winRound = i;
    }
  }
  return boards.sort((a, b) => {
    if (a.winRound! < b.winRound!) return -1;
    if (a.winRound! > b.winRound!) return 1;
    return 0;
  });
}

// Find score of the first winning bingo board
export function part1(input: string) {
  const numbers = parseNumbers(input);
  const boards = parseBoards(input);
  return resolveRounds(numbers, boards)[0].winScore;
}

// Find score of the last winning bingo board
export function part2(input: string) {
  const numbers = parseNumbers(input);
  const boards = parseBoards(input);
  return resolveRounds(numbers, boards)[boards.length - 1].winScore;
}

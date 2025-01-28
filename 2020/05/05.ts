import { M } from "../../common/math.ts";

// Plane has 128 rows and 8 columns
const totalRows = 128;
const totalCols = 8;

// Sum of column numbers for a full row (1 + 2 + 3...)
const fullRowSum = (totalCols - 1) * totalCols / 2;

type Seat = { row: number; col: number };

// Transform "FBFBBFFRLR" -> "0101100101"
const seatCodeToBinary = (code: string) =>
  code
    .replaceAll(/F|L/g, "0")
    .replaceAll(/B|R/g, "1");

// Transform "FBFBBFFRLR" -> { row: 44, col: 5 }
function decodeSeatCode(code: string): Seat {
  const bin = seatCodeToBinary(code);
  return {
    row: parseInt(bin.slice(0, 7), 2),
    col: parseInt(bin.slice(7, 10), 2),
  };
}

// "Every seat has a unique seat ID: multiply the row by 8, then add the column."
const getSeatId = ({ row, col }: Seat) => (row * 8) + col;

// Check if a row has some, but not all seats populated
const isPartialRow = <T>(r: T[]) => r.length > 0 && r.length < totalCols;

// Transform seats positions to 2D grid of rows and columns
// [[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],...]
function groupSeatsByRow(seats: Seat[]): number[][] {
  const rows = new Array(totalRows).fill([]);
  for (const seat of seats) {
    rows[seat.row] = [
      ...rows[seat.row],
      seat.col,
    ];
  }
  return rows;
}

// "What is the highest seat ID on a boarding pass?"
export function part1(input: string) {
  const seats = input.split("\n").map(decodeSeatCode);
  return Math.max(...seats.map(getSeatId));
}

// "Your seat should be the only missing boarding pass in your list"
// "Some of the seats at the very front and back of the plane don't exist"
// "What is the ID of your seat?"
export function part2(input: string) {
  const seats = input.split("\n").map(decodeSeatCode);
  const rows = groupSeatsByRow(seats);
  // Find the row index that is missing a seat
  const row = rows.findIndex(isPartialRow);
  // The difference of sum between a full row and
  // this partial row is the column of the missing seat
  const col = fullRowSum - M.sum(rows[row]);
  return getSeatId({ row, col });
}

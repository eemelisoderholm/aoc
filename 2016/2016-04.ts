import { M } from "../common/math.ts";
import { S } from "../common/string.ts";

type Room = {
  name: string;
  sector: number;
  checksum: string;
};

function parseRoom(line: string): Room {
  const match = line.match(/(^\D+)(\d+)\[([a-z]{5})\]/);
  return {
    name: match?.[1] ?? "",
    sector: parseInt(match?.[2] ?? ""),
    checksum: match?.[3] ?? "",
  };
}

// Sort character counts, breaking ties alphabetically
const sortCharEntries = (
  [aChar, aNum]: [string, number],
  [bChar, bNum]: [string, number],
) => aNum === bNum ? aChar.localeCompare(bChar) : bNum - aNum;

// Get Cesar Cipher shift function (i.e. 2 => "A" => "C")
const getCesarCipherShift = (shift: number) => (char: string): string =>
  String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);

function decryptRoom(room: Room): Room {
  const shift = getCesarCipherShift(room.sector);
  return {
    ...room,
    name: room.name.split("").map(shift).join(""),
  };
}

function validRoom(room: Room): boolean {
  const letters = room.name.replaceAll("-", "");
  const charCounts = S.charCounts(letters);
  const sorted = Object.entries(charCounts).toSorted(sortCharEntries);
  const checksum = sorted.slice(0, 5).map(([c]) => c).join("");
  return room.checksum === checksum;
}

// Find the sum of room sectors
export function part1(input: string) {
  const rooms = input.split("\n").map(parseRoom);
  const valid = rooms.filter(validRoom);
  const sectorSum = M.sum(valid.map((r) => r.sector));
  return sectorSum;
}

// Find sector of northpole object storage room
export function part2(input: string) {
  const rooms = input.split("\n").map(parseRoom);
  const valid = rooms.filter(validRoom);
  const decrypted = valid.map(decryptRoom);
  const target = decrypted.find((r) => r.name.includes("northpole"));
  if (!target) throw new Error("Room not found");
  return target.sector;
}

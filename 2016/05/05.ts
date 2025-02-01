import { C } from "../../common/crypto.ts";

type Mode = "SEQUENTIAL" | "POSITION";

// Characters of the password are contained in MD5 hashes of the
// roomId + index. Generate hashes until 8 characters are found.
const findRoomPassword = (roomId: string, mode: Mode): string => {
  const password: (string | null)[] = new Array(8).fill(null);

  for (let i = 0;; i++) {
    const hash = C.md5(`${roomId}${i}`);

    // Skip any hash not starting with five zeroes
    if (!hash.startsWith("00000")) continue;

    // In sequential mode, the 6th character of the hash is
    // appended to the password as-is.
    if (mode === "SEQUENTIAL") {
      password[password.indexOf(null)] = hash[5];
    }

    // In position mode, the 6th character of the hash is the
    // password position for the 7th character of the hash.
    // hash: 000002a0...     password: __a_____
    //            ^^---------------------^
    if (mode === "POSITION") {
      const pos = parseInt(hash[5], 10);
      if (password[pos] === null) {
        password[pos] = hash[6];
      }
    }

    if (!password.includes(null)) return password.join("");
  }
};

export function part1(input: string) {
  return findRoomPassword(input, "SEQUENTIAL");
}

export function part2(input: string) {
  return findRoomPassword(input, "POSITION");
}

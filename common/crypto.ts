import { crypto } from "@std/crypto";

// Get hexadecimal MD5 hash for given string
function md5(input: string): string {
  const data = new TextEncoder().encode(input);
  const buffer = crypto.subtle.digestSync("MD5", data);
  const bytes = Array.from(new Uint8Array(buffer));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const C = { md5 };

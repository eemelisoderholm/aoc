import { M } from "../common/math.ts";
import { O } from "../common/object.ts";
import { G } from "../common/guard.ts";

// This really didn't benefit at all from doing string literal types,
// type guards and a bunch of lookup records for mere 4 pairs of tokens,
// for a small amount of data, but here we are... 🤷

const tokens = [
  { open: "(", close: ")", corruption: 3, completion: 1 },
  { open: "[", close: "]", corruption: 57, completion: 2 },
  { open: "{", close: "}", corruption: 1197, completion: 3 },
  { open: "<", close: ">", corruption: 25137, completion: 4 },
] as const satisfies ReadonlyArray<
  { open: string; close: string; corruption: number; completion: number }
>;

const tokenPairs = O.fromEntries(tokens.map((t) => [t.open, t.close]));

const corrRec = O.fromEntries(tokens.map((t) => [t.close, t.corruption]));
const getCorruptionScore = (token: Closer) => corrRec[token];

const compRec = O.fromEntries(tokens.map((t) => [t.close, t.completion]));
const getCompletionScore = (token: Closer) => compRec[token];

type Opener = typeof tokens[number]["open"];
const openers = O.keys(tokenPairs);
const isOpener = (token: string): token is Opener =>
  openers.includes(token as Opener);

type Closer = typeof tokens[number]["close"];
const closers = O.values(tokenPairs);
const isCloser = (token: string): token is Closer =>
  closers.includes(token as Closer);

// Find the first unexpected closing character on the line
function getFirstCorruptedToken(line: string): Closer | undefined {
  const expect: Closer[] = [];
  for (const token of line) {
    if (isOpener(token)) {
      expect.push(tokenPairs[token]);
    } else if (isCloser(token) && token !== expect.pop()) {
      return token;
    }
  }
}

// Get the closing characters required to complete an incomplete line
function getCompletionPostfix(line: string): string | undefined {
  const expect: Closer[] = [];
  for (const token of line) {
    if (isOpener(token)) {
      expect.push(tokenPairs[token]);
    } else {
      expect.pop();
    }
  }
  return expect.reverse().join("") || undefined;
}

function getScoreForPostfix(postfix: string): number {
  return ([...postfix] as Closer[]).reduce(
    (acc, token) => (acc * 5) + getCompletionScore(token),
    0,
  );
}

export function part1(input: string) {
  const lineScores = input.split("\n")
    .map(getFirstCorruptedToken)
    .filter(G.isDefined)
    .map(getCorruptionScore);
  return M.sum(lineScores);
}

export function part2(input: string) {
  const postfixScores = input.split("\n")
    .filter((line) => !getFirstCorruptedToken(line))
    .map(getCompletionPostfix)
    .filter(G.isDefined)
    .map(getScoreForPostfix);
  return M.median(postfixScores);
}

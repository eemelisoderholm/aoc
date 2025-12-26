type Key = "R" | "P" | "S";
type Hand = { key: Key; alias: string[]; value: number; win: Key; lose: Key };

const hands: Record<Key, Hand> = {
  R: { key: "R", alias: ["A", "X"], value: 1, win: "S", lose: "P" },
  P: { key: "P", alias: ["B", "Y"], value: 2, win: "R", lose: "S" },
  S: { key: "S", alias: ["C", "Z"], value: 3, win: "P", lose: "R" },
};

const getHandByAlias = (alias: string) =>
  Object.values(hands).find((h) => h.alias.includes(alias)) || hands.R;

const getMatchScore = (opponent: Hand, self: Hand): number => {
  if (self.win === opponent.key) {
    return self.value + 6;
  } else if (self.key === opponent.key) {
    return self.value + 3;
  } else {
    return self.value;
  }
};

const addMatchScore = (score: number, [opponent, self]: Hand[]) =>
  score + getMatchScore(opponent, self);

const getHandByOutcome = (opponent: Hand, outcome: string): Hand => ({
  X: hands[opponent.win],
  Y: hands[opponent.key],
  Z: hands[opponent.lose],
}[outcome] ?? hands[opponent.key]);

const pairToHands = ([a, b]: string[]) => {
  const opponent = getHandByAlias(a);
  return [opponent, getHandByOutcome(opponent, b)];
};

export function part1(input: string) {
  const lines = input.split("\n");
  const matches = lines.map((ln) => ln.split(" ").map(getHandByAlias));
  return matches.reduce(addMatchScore, 0);
}

export function part2(input: string) {
  const lines = input.split("\n");
  const hands = lines.map((ln) => ln.split(" ")).map(pairToHands);
  return hands.reduce(addMatchScore, 0);
}

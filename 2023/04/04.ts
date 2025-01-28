import { M } from "../../common/math.ts";

function parseCardMatches(input: string): number[] {
  return input.split("\n").map((line) => {
    const [_head, body] = line.split(": ");
    const [winning, numbers] = body.split(" | ")
      .map((x) => Array.from(x.match(/\d{1,2}/g) ?? []));
    const matches = winning.filter((n) => numbers.includes(n)).length;
    return matches;
  });
}

export function part1(input: string) {
  const matches = parseCardMatches(input);
  // First match is worth one point, while
  // following matches double the value
  const scores = matches.map((n) => Math.floor(Math.pow(2, n - 1)));
  return M.sum(scores);
}

export function part2(input: string) {
  const matches = parseCardMatches(input);
  // Each card copies n following cards,
  // where n is the matches on the card
  const cards = matches.map((n) => [1, n]);
  // Storing as [cardCount, cardValue][],
  // initially we have one of each card.
  for (let i = 0; i < cards.length; i++) {
    const [count, n] = cards[i];
    // Add one copy to following N cards,
    // for each copy of this card
    for (let j = 0; j < n; j++) {
      cards[i + 1 + j][0] += count;
    }
  }
  // "How many total cards do you end up with?"
  return M.sum(cards.map(([n]) => n));
}

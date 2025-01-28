import { M } from "../../common/math.ts";

function getAnswerCountsForGroup(input: string): {
  answers: Record<string, number>;
  members: number;
} {
  const answers: Record<string, number> = {};
  const lines = input.split("\n");
  for (const line of lines) {
    const chars = [...new Set(line.split(""))];
    for (const char of chars) {
      answers[char] = (answers[char] ?? 0) + 1;
    }
  }
  return { answers, members: lines.length };
}

// "For each group, count the number of questions to which ANYONE answered 'yes'"
// "What is the sum of those counts?"
export function part1(input: string) {
  const groups = input.split("\n\n").map(getAnswerCountsForGroup);
  const totals = groups.map((group) => Object.values(group.answers).length);
  return M.sum(totals);
}

// "For each group, count the number of questions to which EVERYONE answered 'yes'"
// "What is the sum of those counts?"
export function part2(input: string) {
  const groups = input.split("\n\n").map(getAnswerCountsForGroup);
  const values = groups.map(({ answers, members }) =>
    Object.values(answers).filter((a) => a >= members).length
  );
  return M.sum(values);
}

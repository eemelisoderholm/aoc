import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";

interface PageOrderingRules {
  before: Record<number, number[]>;
  after: Record<number, number[]>;
  items: [number, number][];
}

function rulesToSortFn(
  rules: PageOrderingRules,
): (a: number, b: number) => number {
  return (a, b) => {
    if (rules.before[a] && rules.before[a].includes(b)) return -1;
    if (rules.after[a] && rules.after[a].includes(b)) return 1;
    return 0;
  };
}

function parsePageOrderingRules(input: string): PageOrderingRules {
  const section = input.split("\n\n")[0];
  const lines = section.split("\n");

  const rules: PageOrderingRules = {
    before: {},
    after: {},
    items: lines.map((ln) => ln.split("|").map((x) => parseInt(x))) as [
      number,
      number,
    ][],
  };

  rules.items.forEach(([a, b]) => {
    if (!rules.before[b]) rules.before[b] = [];
    rules.before[b].push(a);
    if (!rules.after[a]) rules.after[a] = [];
    rules.after[a].push(b);
  });

  return rules;
}

function parseUpdates(input: string): number[][] {
  const section = input.split("\n\n")[1];
  const lines = section.split("\n");
  const nums = lines.map((ln) => ln.split(",").map((x) => parseInt(x)));
  return nums;
}

function validateUpdate(update: number[], rules: PageOrderingRules): boolean {
  for (let i = 0; i < update.length; i++) {
    const value = update[i];
    const before = i === 0 ? [] : update.slice(0, i);
    const after = update.slice(i + 1);
    if (rules.after[value]) {
      for (const b of before) {
        if (rules.after[value].includes(b)) return false;
      }
    }
    if (rules.before[value]) {
      for (const a of after) {
        if (rules.before[value].includes(a)) return false;
      }
    }
  }
  return true;
}

export function part1(input: string) {
  const rules = parsePageOrderingRules(input);
  const updates = parseUpdates(input);
  const validUpdates = updates.filter((u) => validateUpdate(u, rules));
  const mids = validUpdates.map(A.middle).filter(Boolean) as number[];
  return M.sum(mids);
}

export function part2(input: string) {
  const rules = parsePageOrderingRules(input);
  const updates = parseUpdates(input);
  const invalidUpdates = updates.filter((u) => !validateUpdate(u, rules));
  const sortFn = rulesToSortFn(rules);
  const fixedUpdates = invalidUpdates.map((u) => u.toSorted(sortFn));
  const mids = fixedUpdates.map(A.middle).filter(Boolean) as number[];
  return M.sum(mids);
}

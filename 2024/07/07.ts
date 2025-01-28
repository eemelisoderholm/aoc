import { M } from "../../common/math.ts";

type Equation = { result: number; values: number[] };

function parseEquations(input: string): Equation[] {
  const lines = input.split("\n");
  return lines.map((line) => {
    const parts = line.split(":");
    const result = parseInt(parts[0]);
    const values = parts[1].trim().split(" ").map((x) => parseInt(x));
    return { result, values };
  });
}

const operators = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "||": (a, b) => parseInt(`${a}${b}`),
} as const satisfies Record<string, (a: number, b: number) => number>;

type Operator = keyof typeof operators;

function findValidOperatorCombinations(
  equation: Equation,
  operatorKeys: Operator[],
): Operator[][] {
  const { result, values } = equation;
  if (values.length < 2) return [];

  const numOperators = values.length - 1;

  const results: Operator[][] = [];

  function evaluate(ops: Operator[]): number {
    let total = values[0];
    for (let i = 0; i < ops.length; i++) {
      total = operators[ops[i]](total, values[i + 1]);
    }
    return total;
  }

  function backtrack(currentOps: Operator[]): void {
    if (currentOps.length === numOperators) {
      if (evaluate(currentOps) === result) {
        results.push([...currentOps]);
      }
      return;
    }

    for (const op of operatorKeys) {
      currentOps.push(op);
      backtrack(currentOps);
      currentOps.pop();
    }
  }

  backtrack([]);
  return results;
}

export function part1(input: string) {
  const equations = parseEquations(input);
  const valid = equations.filter((e) =>
    findValidOperatorCombinations(e, ["+", "*"]).length > 0
  );
  return M.sum(valid.map(({ result }) => result));
}

export function part2(input: string) {
  const equations = parseEquations(input);
  const valid = equations.filter((e) =>
    findValidOperatorCombinations(e, ["+", "*", "||"]).length > 0
  );
  return M.sum(valid.map(({ result }) => result));
}

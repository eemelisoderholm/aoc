import { A } from "../common/array.ts";
import { M } from "../common/math.ts";
import { P } from "../common/parse.ts";

type Problem = {
  values: number[];
  operator: Operator;
};

const ops = {
  "+": M.sum,
  "*": M.prod,
};

const solveProblem = ({ values, operator }: Problem) => ops[operator](values);

type Operator = keyof typeof ops;

type ValuesParser = (colGroup: string[][]) => number[];

const parseProblems = (input: string, parser: ValuesParser): Problem[] => {
  const colGrid = P.asCharColGrid(input);
  const colGroups = A.splitOn(colGrid, isEmptyColumn);
  const operators = colGroups.map(getOperator);
  const values = colGroups.map(parser);
  return values.map((values, index) => ({
    values,
    operator: operators[index],
  }));
};

const isEmptyColumn = (col: string[]) => col.every((c) => c.trim() === "");

const getOperator = (colGroup: string[][]) => A.last(colGroup[0]) as Operator;

const getValuesByRow = (colGrid: string[][]) =>
  A.transpose(colGrid)
    .map((chars) => parseInt(chars.join("")))
    .filter(Number.isFinite);

// Values from column groups as vertical slice, going right to left
const getValuesByColumn = (cols: string[][]): number[] =>
  cols.map((col) => parseInt(col.join("").replace(/\D+/g, "")));

// Find sum of answers while reading values line by line
export function part1(input: string) {
  const problems = parseProblems(input, getValuesByRow);
  const solutions = problems.map(solveProblem);
  return M.sum(solutions);
}

// Find sum answers while reading values as columns RTL
export function part2(input: string) {
  const problems = parseProblems(input, getValuesByColumn);
  const solutions = problems.map(solveProblem);
  return M.sum(solutions);
}

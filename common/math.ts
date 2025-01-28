const add = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;
const mul = (a: number, b: number): number => a * b;
const diff = (a: number, b: number): number => Math.abs(a - b);

const sum = (vals: number[]): number => vals.reduce(add, 0);
const average = (vals: number[]): number => sum(vals) / vals.length;
const median = (arr: number[]): number | undefined => {
  if (!arr.length) return undefined;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : ((s[mid - 1] + s[mid]) / 2);
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const M = {
  add,
  sub,
  mul,
  diff,
  sum,
  average,
  median,
  clamp,
};

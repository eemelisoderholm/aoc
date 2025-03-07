/** Pick first item of an array */
const head = <T>(arr: T[]) => arr[0];

/** Pick all but the first item of an array */
const tail = <T>(arr: T[]) => {
  if (!arr.length) return [];
  const [_, ...tail] = arr;
  return tail;
};

const last = <T>(arr: T[]) => arr[arr.length - 1];

/** Pick the middle item of an array, if array length is odd */
const middle = <T>(arr: T[]): T | undefined => {
  const index = arr.length / 2;
  if (!Number.isInteger(index)) {
    return arr[Math.floor(index)];
  }
};

/** Divide an array into two arrays by a filter function */
const partition = <T>(
  arr: T[],
  filter: (x: T, i: number) => boolean,
): [T[], T[]] =>
  arr.reduce(
    ([pass, fail], x, i) =>
      filter(x, i) //
        ? [[...pass, x], fail]
        : [pass, [...fail, x]],
    [[], []] as [T[], T[]],
  );

/** Divide array into two arrays from the middle */
const divide = <T>(arr: T[]): [T[], T[]] => {
  const cutoff = Math.ceil(arr.length / 2);
  return [
    arr.slice(0, cutoff),
    arr.slice(cutoff),
  ];
};

/** Split array into sub arrays of given size */
const chunk = <T>(arr: T[], size: number): T[][] =>
  [
    ...Array(Math.ceil(arr.length / size)),
  ].map((_, i) => arr.slice(i * size, i * size + size));

/** Flip rows to columns */
const transpose = <T>(matrix: T[][]): T[][] =>
  matrix[0].map((_row, c) => matrix.map((_col, r) => matrix[r][c]));

/** Get curried split function, i.e. splitter("\n") */
const splitter = (by: string) => (s: string) => s.split(by);

/** Get curried map function, i.e. mapper(x => parseInt(x)) */
const mapper = <A, R>(fn: (arg: A) => R) => (arr: A[]) => arr.map(fn);

type Tuple<T, N extends number> = N extends N
  ? number extends N ? T[] : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

/**
 * Get an array of tuples representing all the combinations of given items
 * @param items Items to pick combinations from
 * @param levels How many items per combination, default 2 (pairs)
 * @returns Array of unique combinations as tuples of length N
 * @example getCombinations([1, 2, 3], 2) -> [[1, 2], [2, 3], [1, 3]]
 * Inspired by https://gist.github.com/axelpale/3118596
 */
export function combinations<T, N extends number = 2>(
  items: T[],
  levels: N = 2 as N,
): Tuple<T, N>[] {
  if (levels > items.length || levels <= 0) return [];
  if (levels === items.length) return [items] as Tuple<T, N>[];
  if (levels === 1) {
    return items.reduce((a, c) => [...a, [c]], [] as T[][]) as Tuple<T, N>[];
  }
  const combs = [] as Tuple<T, N>[];
  for (let i = 0; i <= items.length - levels + 1; i++) {
    const tail = combinations(items.slice(i + 1), levels - 1);
    for (let j = 0; j < tail.length; j++) {
      combs.push([items[i], ...tail[j]] as Tuple<T, N>);
    }
  }
  return combs;
}

type ValueToKeyFn<T> = (x: T) => string;
const valueAsKey = (x: unknown): string => `${x}`;

function group<T>(
  arr: T[],
  keyFn: ValueToKeyFn<T> = valueAsKey,
): Record<string, T[]> {
  const rec: Record<string, T[]> = {};
  arr.forEach((value) => {
    const key = keyFn(value);
    rec[key] = rec[key] ?? [];
    rec[key].push(value);
  });
  return rec;
}

/**
 * Count the number of occurances of a value in an array
 */
const count = <T extends string | number>(
  needle: T,
  haystack: T[],
): number => {
  return haystack.filter((x) => x === needle).length;
};

/**
 * Get the number of occurances for each value in the given array
 * @example ["A", "A", "A", "B", "B"] => { A: 3, B: 2 }
 * @example [10, 10, 10, 20, 20] => { 10: 3, 20: 2 }
 */
const counts = <T extends string | number>(
  arr: T[],
): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const val of arr) {
    const key = val.toString();
    counts[key] ??= 0;
    counts[key]++;
  }
  return counts;
};

/**
 * Get a new array sorted by the given function, but rather than
 * using the values as the sort parameters, the function receives the
 * total count of the values within the array
 * @example freqSort([3, 3, 1, 2, 2, 2], (a, b) => b - a)) =>
 *                   [2, 2, 2, 3, 3, 1]
 */
const freqSort = <T extends (string | number)>(
  arr: T[],
  fn: (a: number, b: number) => number,
): T[] => {
  const c = counts(arr);
  return arr.toSorted((a, b) => {
    const aCount = c[a.toString()];
    const bCount = c[b.toString()];
    return fn(aCount, bCount);
  });
};

/**
 * Get frequencies of all unique values among given arrays or sets
 * @example frequencies(['A', 'B'], ['A'], ['A', 'B', 'C']) ->
 * {
 *   freqMap: Map{ 'A': 3, 'B': 2, 'C': 1 },
 *   mostFreq: { value: 'A', total: 3 },
 *   leastFreq: { value: 'C', total: 1 }
 * }
 */
const frequencies = <T extends string | number>(
  arrs: T[][] | Set<T>[],
): {
  freqMap: Map<T, number>;
  mostFreq: { value: T; total: number } | null;
  leastFreq: { value: T; total: number } | null;
} => {
  const freqMap = new Map<T, number>();
  for (const arr of arrs) {
    for (const item of arr) {
      freqMap.set(item, (freqMap.get(item) || 0) + 1);
    }
  }
  let mostFreq: { value: T; total: number } | null = null;
  let leastFreq: { value: T; total: number } | null = null;
  for (const [item, freq] of freqMap) {
    if (!mostFreq || freq > mostFreq.total) {
      mostFreq = { value: item, total: freq };
    }
    if (!leastFreq || freq < leastFreq.total) {
      leastFreq = { value: item, total: freq };
    }
  }
  return {
    freqMap,
    mostFreq,
    leastFreq,
  };
};

const windows = <T>(arr: T[], size: number): T[][] =>
  arr.reduce(
    (acc, _, i) =>
      i + size > arr.length ? acc : [...acc, arr.slice(i, i + size)] as T[][],
    [] as T[][],
  );

/**
 * Get an array filled with numbers of given range
 * The maximum value is NOT contained in the array
 * range(5) => [0, 1, 2, 3, 4]
 * range(-2, 3) => [-2, -1, 0, 1, 2]
 * range(0, 100, 20) => [0, 20, 40, 60, 80]
 */
const range = (a: number, b?: number, step?: number): number[] => {
  const min = typeof b === "number" ? a : 0;
  const max = typeof b === "number" ? b : a;
  const length = Math.abs(max - min);
  return new Array(length).fill(0).map((_, i) => min + (i * (step ?? 1)));
};

export const A = {
  head,
  tail,
  last,
  middle,
  partition,
  divide,
  chunk,
  transpose,
  splitter,
  mapper,
  combinations,
  group,
  count,
  counts,
  freqSort,
  frequencies,
  windows,
  range,
};

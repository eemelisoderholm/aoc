const isNumeric = (s: string): boolean => /^\d+$/.test(s);

const isNonNullable = <T>(x: T): x is NonNullable<T> =>
  x !== null && x !== undefined;

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;

const isTruthy = <T>(x: T): x is Truthy<T> => Boolean(x);
const isDefined = <T>(x: T | undefined): x is T => typeof x !== "undefined";

export const G = {
  isNumeric,
  isNonNullable,
  isTruthy,
  isDefined,
};

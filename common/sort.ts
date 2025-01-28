const ascending = <T extends (string | number)>(a: T, b: T): number => {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  throw new Error("Sort params must be of same type");
};

const descending = <T extends (string | number)>(a: T, b: T): number =>
  ascending(a, b) * -1;

export const SORT = { ascending, descending };

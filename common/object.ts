type EmptyObject = Record<string | number | symbol, never>;

// Narrowed versions of standard Object prototype methods
// i.e.
//   Object.keys(T) -> string[]
//   O.keys(T)      -> Array<keyof T>

const keys = Object.keys as <T>(
  object: T,
) =>
  (keyof T extends infer U
    ? U extends string ? U : U extends number ? `${U}` : never
    : never)[];

const values = Object.values as <T>(
  object: T,
) => Array<T[keyof T]>;

const entries = Object.entries as <O extends EmptyObject>(
  object: O,
) => Array<[keyof O, O[keyof O]]>;

const fromEntries = Object.fromEntries as <K extends string, V>(
  entries: [K, V][],
) => Record<K, V>;

export const O = {
  keys,
  values,
  entries,
  fromEntries,
};

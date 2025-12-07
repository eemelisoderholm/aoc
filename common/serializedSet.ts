type SetValueSerializer<T> = (x: T) => string;
type SetValueDeserializer<T> = (x: string) => T;

/**
 * Wraps Set with given serializing and deserializing functions,
 * so Set may be used with non-primitive values without manually
 * stringifying them in and out of the set, or relying on
 * object reference equality
 *
 * Does not cover full Set functionality and will hopefully be
 * made obsolete by standard Tuple in the future
 *
 * For example:
 *   const Vec2Set = createSerializedSet<Vec2>(v2ToString, v2FromString)
 *   const myVec2Set = new Vec2Set([ { x: 0, y: 2 }, { x: 1, y: 0 } ])
 *   myset.has({ x: 1, y: 0 }) // true
 */
export function createSerializedSet<T>(
  serialize: SetValueSerializer<T>,
  deserialize: SetValueDeserializer<T>,
) {
  return class SerializedSet {
    private set = new Set<string>();

    constructor(items?: Iterable<T>) {
      if (items) {
        for (const item of items) {
          this.add(item);
        }
      }
    }

    add(item: T): this {
      this.set.add(serialize(item));
      return this;
    }

    has(item: T): boolean {
      return this.set.has(serialize(item));
    }

    delete(item: T): boolean {
      return this.set.delete(serialize(item));
    }

    clear(): void {
      this.set.clear();
    }

    get size(): number {
      return this.set.size;
    }

    values(): IterableIterator<T> {
      const iterator = this.set.values();
      return (function* () {
        for (const value of iterator) {
          yield deserialize(value);
        }
      })();
    }

    forEach(fn: (value: T) => void) {
      return this.set.forEach((s) => fn(deserialize(s)));
    }

    difference(other: SerializedSet): SerializedSet {
      return this.filter((v) => !other.has(v));
    }

    intersection(other: SerializedSet): SerializedSet {
      return this.filter((v) => other.has(v));
    }

    union(other: SerializedSet): SerializedSet {
      return new SerializedSet([...this, ...other]);
    }

    filter(fn: (value: T) => boolean): SerializedSet {
      return new SerializedSet([...this].filter(fn));
    }

    [Symbol.iterator](): Iterator<T> {
      return this.values();
    }
  };
}

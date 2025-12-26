type MapKeySerializer<T> = (x: T) => string;
type MapKeyDeserializer<T> = (x: string) => T;

/**
 * Wraps Map with given serializing and deserializing functions,
 * so Map may be used with non-primitive keys without manually
 * stringifying them in and out of the map, or relying on object
 * reference equality
 *
 * Does not cover full Map functionality and will hopefully be
 * made obsolete by standard Record in the future
 *
 * For example:
 *   const Vec2Map = createSerializedMap<Vec2>(v2ToString, v2FromString)
 *   const myVec2Map = new Vec2Map()
 *   myVec2Map.set({ x: 1, y: 0 }, 5)
 *   myVec2Map.get({ x: 1, y: 0}) // 5
 */
export function createSerializedMap<K>(
  serialize: MapKeySerializer<K>,
  deserialize: MapKeyDeserializer<K>,
) {
  return class SerializedMap<V> {
    private map = new Map<string, V>();

    constructor(entries?: [K, V][]) {
      if (entries) {
        entries.forEach(([key, value]) => this.set(key, value));
      }
    }

    set(key: K, value: V): this {
      this.map.set(serialize(key), value);
      return this;
    }

    get(key: K): V | undefined {
      return this.map.get(serialize(key));
    }

    has(key: K): boolean {
      return this.map.has(serialize(key));
    }

    delete(key: K): boolean {
      return this.map.delete(serialize(key));
    }

    clear(): void {
      this.map.clear();
    }

    get size(): number {
      return this.map.size;
    }

    keys(): IterableIterator<K> {
      return Array.from(this.map.keys()).map(deserialize)[Symbol.iterator]();
    }

    values(): IterableIterator<V> {
      return this.map.values();
    }

    get vals(): V[] {
      return [...this.values()];
    }

    entries(): IterableIterator<[K, V]> {
      return Array.from(this.map.entries()).map((
        [key, value],
      ) => [deserialize(key), value] as [K, V])[Symbol.iterator]();
    }

    forEach(fn: (v: V, k: K, m: this) => void): void {
      this.map.forEach((v, k) => fn(v, deserialize(k), this));
    }
  };
}

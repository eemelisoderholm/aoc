const distinct = (chars: string[]): boolean =>
  (new Set(chars)).size === chars.length;

const pickUntilFirstMatch = <T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  data: T[],
): T[] => {
  const output: T[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    output.push(item);
    if (fn(item, i, data)) break;
  }
  return output;
};

const getDistinctSequenceFilter =
  (length: number) => (_: string, index: number, chars: string[]): boolean =>
    index < length - 1
      ? false
      : distinct(chars.slice(index - (length - 1), index + 1));

const isPacketMarker = getDistinctSequenceFilter(4);

export function part1(input: string) {
  return pickUntilFirstMatch(isPacketMarker, input.split("")).length;
}

const isMessageMarker = getDistinctSequenceFilter(14);

export function part2(input: string) {
  return pickUntilFirstMatch(isMessageMarker, input.split("")).length;
}

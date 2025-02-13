const parseMemBanks = (input: string): number[] =>
  input.split("\t").map((x) => parseInt(x));

// Redistribute the highest value within the memory banks
// evenly between all the items, starting from the next
// item and looping around [0, 2, 7, 0] => [2, 4, 1, 2]
const redistribute = (banks: number[]): number[] => {
  let index = banks.indexOf(Math.max(...banks));
  let distributable = banks[index];
  banks[index] = 0;
  do {
    index = (index + 1) % banks.length;
    banks[index]++;
    distributable--;
  } while (distributable);
  return banks;
};

// Redistribute until a memory bank configuration is repeated,
// which indicates an infinite loop
const redistributeUntilRepeat = (memBanks: number[]): {
  totalCycles: number;
  loopCycles: number;
} => {
  const configs = new Map<string, number>();
  for (let i = 0;; i++) {
    const config = memBanks.join(",");
    const duplicate = configs.get(config);
    if (duplicate) {
      return {
        totalCycles: i,
        loopCycles: i - duplicate,
      };
    }
    configs.set(config, i);
    memBanks = redistribute(memBanks);
  }
};

// "How many redistribution cycles must be completed before
//  a configuration is produced that has been seen before?"
export function part1(input: string) {
  const memBanks = parseMemBanks(input);
  return redistributeUntilRepeat(memBanks).totalCycles;
}

// "How many cycles are in the infinite loop that arises
//  from the configuration in your puzzle input?"
export function part2(input: string) {
  const memBanks = parseMemBanks(input);
  return redistributeUntilRepeat(memBanks).loopCycles;
}

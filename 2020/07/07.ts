type BagChildGraph = Record<string, Record<string, number>>;

// "light red bags contain 1 bright white bag, 2 muted yellow bags."
// -> { "light red": { "bright white": 1, "muted yellow": 2 }, ... }
function parseBags(input: string): BagChildGraph {
  const lines = input.split("\n");
  const bags: BagChildGraph = {};
  for (const line of lines) {
    const [head, body] = line.split(" contain ");
    const parent = head.replace(/ bag(s)?/, "");
    const children = body.split(", ").map((str) => {
      if (str.includes("no other")) return null;
      const words = str.split(" ");
      const count = parseInt(words[0]);
      const name = words.slice(1, -1).join(" ");
      return [name, count];
    }).filter(Boolean) as [string, number][];
    bags[parent] = Object.fromEntries(children);
  }
  return bags;
}

type BagParentGraph = Record<string, string[]>;
// Invert the bag graph for efficient lookup of bag's parents
// { parent1: { child1: 7, child2: 4 } } -> { child1: [parent1, parent2] }
function getBagParentGraph(graph: BagChildGraph): BagParentGraph {
  const inverted: Record<string, string[]> = {};
  for (const parent in graph) {
    inverted[parent] = inverted[parent] ?? [];
    for (const child in graph[parent]) {
      inverted[child] = inverted[child] ?? [];
      inverted[child].push(parent);
    }
  }
  return inverted;
}

function getAncestorBags(
  parents: BagParentGraph,
  bag: string,
  set = new Set<string>(),
): Set<string> {
  set.add(bag);
  for (const parent of parents[bag]) {
    getAncestorBags(parents, parent, set);
  }
  return set;
}

function getNestedBagCount(children: BagChildGraph, bag: string): number {
  let total = 1;
  for (const child in children[bag]) {
    const count = children[bag][child];
    total += getNestedBagCount(children, child) * count;
  }
  return total;
}

// "How many bag colors can eventually contain at least one `shiny gold` bag?"
export function part1(input: string) {
  const bagGraph = parseBags(input);
  const parentGraph = getBagParentGraph(bagGraph);
  const ancestors = getAncestorBags(parentGraph, "shiny gold");
  return ancestors.size - 1;
}

// "How many individual bags are required inside your single `shiny gold` bag?"
export function part2(input: string) {
  const bagGraph = parseBags(input);
  return getNestedBagCount(bagGraph, "shiny gold") - 1;
}

// Parse the orbit pairs into tuples
// A)B\nB)C\nC)D => [[A, B], [B, C], [C, D]]
const parseOrbitPairs = (input: string): [string, string][] =>
  input.split("\n").map((ln) => ln.split(")") as [string, string]);

type OrbitGraph = Map<string, string[]>;
// Create a bidirectional map of the orbits
// { "COM": ["B"], "B": ["COM", "C", "G"], ... }
const createOrbitGraph = (pairs: [string, string][]) => {
  const graph: OrbitGraph = new Map();
  for (const [a, b] of pairs) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a)?.push(b);
    graph.get(b)?.push(a);
  }
  return graph;
};

// Find the total number of direct and indirect orbits in the graph
const getTotalOrbits = (graph: OrbitGraph, root = "COM"): number => {
  const visited: Set<string> = new Set();
  const depthFirstSearch = (node: string, depth = 0): number => {
    if (visited.has(node)) return 0;
    visited.add(node);
    let count = depth;
    for (const neighbor of graph.get(node) ?? []) {
      count += depthFirstSearch(neighbor, depth + 1);
    }
    return count;
  };
  return depthFirstSearch(root);
};

// Find how many orbits need to be jumped to reach another node in the graph
const getTransfers = (graph: OrbitGraph, from = "YOU", to = "SAN"): number => {
  const [start] = graph.get(from)!;
  const [end] = graph.get(to)!;
  const queue: [string, number][] = [[start, 0]];
  const visited: Set<string> = new Set([start]);
  while (queue.length) {
    const [curr, transfers] = queue.shift()!;
    if (curr === end) return transfers;
    const neighbors = graph.get(curr) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, transfers + 1]);
      }
    }
  }
  throw new Error(`No path found from ${from} to ${to}`);
};

export function part1(input: string) {
  const pairs = parseOrbitPairs(input);
  const graph = createOrbitGraph(pairs);
  return getTotalOrbits(graph);
}

export function part2(input: string) {
  const pairs = parseOrbitPairs(input);
  const graph = createOrbitGraph(pairs);
  return getTransfers(graph);
}

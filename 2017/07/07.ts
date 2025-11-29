import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";
import { Tree, TreeNode } from "../../common/tree.ts";

const parseInput = (input: string): TreeNode<number> =>
  Tree.from(
    input.split("\n").map((line) => {
      const match = line.match(/^([a-z]+)\s\((\d+)\)(?:\s->\s(.+))?$/);
      // Example line  : asdasdasd (123) -> asdf, fdsa
      // Capture groups: 1--------  2--     3---------
      if (!match) throw new Error(`Could not parse line "${line}"`);
      return {
        id: match[1],
        value: parseInt(match[2]),
        childIds: match[3] ? match[3].split(", ") : [],
      };
    }),
  );

/**
 * Traverse through the given tree and find the first node
 * where the sum of its weight is different from the
 * weights of its siblings. The weight is determined by
 * the sum of all the branch's child values
 * @param node Root node of the tree
 * @returns The imbalanced node and the imbalance offset
 */
const findImbalancedNode = (node: TreeNode<number>): {
  total: number;
  node?: TreeNode<number>;
  offset: number;
} => {
  const { children, value } = node;

  // Leaf nodes can't be imbalanced
  if (children.length === 0) return { total: value, offset: 0 };

  // Traverse each branch recursively
  const results = children.map(findImbalancedNode);

  // Bubble up when the imbalanced node has been found
  const result = results.find((r) => r.node);
  if (result) return result;

  const totals = results.map((r) => r.total);
  const total = M.sum([value, ...totals]);

  // Exit if all the branches are balanced
  const balanced = totals.length < 2 || A.allEqual(totals);
  if (balanced) return { total, offset: 0 };

  // Find the imbalanced branch node and the weight difference
  const outlier = A.findOutlierByFrequency(totals);
  if (!outlier) throw new Error("Expected imbalanced values");
  const { index, expected, actual } = outlier;

  return {
    total,
    node: children[index],
    offset: expected - actual,
  };
};

// "What is the name of the bottom program?"
// -> Find the root node of the tree
export function part1(input: string) {
  const root = parseInput(input);
  return root.id;
}

// "Given that exactly one program is the wrong weight, what would
// its weight need to be to balance the entire tower?"
// -> Find imbalanced branch and apply correction
export function part2(input: string) {
  const root = parseInput(input);
  const { node, offset } = findImbalancedNode(root);
  if (!node) throw new Error("Tree is already balanced");
  return node.value + offset;
}

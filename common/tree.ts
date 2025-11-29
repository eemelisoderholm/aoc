export type TreeNode<T = unknown> = {
  id: string;
  value: T;
  children: TreeNode<T>[];
};

export type TreeNodeFlatWithChildIds<T = unknown> = {
  id: string;
  value: T;
  childIds: string[];
};

export type TreeNodeFlatWithParentId<T = unknown> = {
  id: string;
  value: T;
  parentId?: string;
};

export type TreeNodeFlat<T> =
  | TreeNodeFlatWithChildIds<T>
  | TreeNodeFlatWithParentId<T>;

/**
 * Create a tree from the given flat array with either
 * childIds or parentId defining the structure
 * @returns Tree root node
 */
const from = <T>(nodes: TreeNodeFlat<T>[]): TreeNode<T> => {
  if ("childIds" in nodes[0]) {
    return createTreeByChildIds(nodes as TreeNodeFlatWithChildIds<T>[]);
  }
  return createTreeByParentIds(nodes as TreeNodeFlatWithParentId<T>[]);
};

const getNodeEntries = <T>(nodes: TreeNodeFlat<T>[]): [string, TreeNode<T>][] =>
  nodes.map((n) => [n.id, { id: n.id, value: n.value, children: [] }]);

const getTreeNodeMap = <T>(
  nodes: TreeNodeFlat<T>[],
): Map<string, TreeNode<T>> => new Map(getNodeEntries(nodes));

const createTreeByChildIds = <T>(
  nodes: TreeNodeFlatWithChildIds<T>[],
): TreeNode<T> => {
  const nodeMap = getTreeNodeMap(nodes);
  const childIds = new Set<string>();
  for (const node of nodes) {
    const parent = nodeMap.get(node.id)!;
    for (const childId of node.childIds) {
      const child = nodeMap.get(childId);
      if (!child) {
        throw new Error(
          `Invalid tree: Unknown child "${childId}" referenced by "${node.id}"`,
        );
      }
      parent.children.push(child);
      childIds.add(childId);
    }
  }

  const roots = nodes.filter((n) => !childIds.has(n.id));

  if (roots.length === 0) throw new Error("Invalid tree: No root found");
  if (roots.length > 1) throw new Error("Invalid tree: Multiple roots");

  return nodeMap.get(roots[0].id)!;
};

const createTreeByParentIds = <T>(
  nodes: TreeNodeFlatWithParentId<T>[],
): TreeNode<T> => {
  const nodeMap = getTreeNodeMap(nodes);
  const rootIds: string[] = [];
  for (const node of nodes) {
    if (!node.parentId) {
      rootIds.push(node.id);
      continue;
    }
    const parent = nodeMap.get(node.parentId);
    if (!parent) {
      throw new Error(
        `Invalid tree: Unknown parent "${node.parentId}" referenced by "${node.id}"`,
      );
    }
    parent.children.push(nodeMap.get(node.id)!);
  }

  if (rootIds.length === 0) throw new Error("Invalid tree: No root found");
  if (rootIds.length > 1) throw new Error("Invalid tree: Multiple roots");

  return nodeMap.get(rootIds[0])!;
};

export const Tree = {
  from,
};

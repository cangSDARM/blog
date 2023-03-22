export type Node = { type?: string; children?: Node[]; value: any };
export type Tester<T extends Node = Node> = (node: T) => boolean;
export type Traveler<T extends Node = Node> = (
  node: T,
  index: number,
  parent?: T,
  root?: T
) => void;

const forEach = ([] as any[]).forEach;

let root: any | undefined = undefined, depth = 0;
export const visitor = <T extends Node>(
  node: T,
  tester: Tester<T>,
  traveler: Traveler<T>
) => {
  if (tester(node)) {
    traveler(node, 0, undefined, node);
  }
  if (!root) {
    root = node;
  }

  if (Array.isArray(node.children)) {
    forEach.apply(node.children, [
      (child, index) => {
        if (!tester(child)) return;

        visitor(child, tester, () => {
          traveler(child, index, node, root);
        });
      },
    ]);
  }
};

export const isJsxElement = (node: Node) => node.type === 'mdxJsxFlowElement';

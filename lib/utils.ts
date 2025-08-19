import { Node as UnistNode } from "unist-util-visit/lib";

export type Node = UnistNode & { value: any; children?: Node[] };
export type RehypeNode = Node & {
  tagName?: string;
  properties: Record<string, any>;
};

export const forEach = ([] as any[]).forEach;

export const isJsxElement = (node: Node) => node.type?.startsWith("mdxJsx");

import { slug } from "github-slugger";
import { visitor, Node, isJsxElement } from "./utils";

type RehypeNode = Node & { properties: Record<string, any>; tagName?: string };

const isHeading = (node: RehypeNode) =>
  ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName || "") && node.type === 'element';

export default function rehypeSlug({ prefix = "" }: { prefix?: string } = {}) {
  return (root: RehypeNode) => {
    visitor(
      root,
      (node) => {
        return isHeading(node) || isJsxElement(node);
      },
      (node, index, parent) => {
        if (isHeading(node) || (node as any).name === 'Anchor') {
            console.log(node, index);
        }
      }
    );
  };
}

import { isJsxElement, Node } from "./utils";
import { visit, SKIP } from "unist-util-visit";

const splice = ([] as Node[]).splice;
const some = ([] as any[]).some;
const paragraph = "paragraph";

export const DefaultOption = {
  unwrapTags: ["div", "aside", "header", "main", "figure"],
  noIncludeTags: ["mdxBlockElement"],
};

export type Option = Partial<typeof DefaultOption>;

// https://github.com/mdx-js/mdx/issues/1170#issuecomment-725622285
function remarkDropUnnecessaryParagraph(options = DefaultOption) {
  const { unwrapTags = [], noIncludeTags = [] } = options || {};

  const isNeedCleanInnerParagraph = (node: Node) => {
    return isJsxElement(node) || noIncludeTags.includes(node?.type || "");
  };

  const isNeedCleanOuterParagraph = (nodes: Node[]) => {
    // not all inline
    return some.apply(nodes, [
      (child) => {
        return unwrapTags.includes(child.type || "") || isJsxElement(child);
      },
    ]);
  };

  function visitor(node: Node, index: number | null, parent: Node | undefined) {
    // if there are children available keep diving into them
    if (Array.isArray(node.children)) {
      node.children.forEach(function (child) {
        visit(child, visitor as any);
      });
    }

    const isParagraph = node.type === paragraph;

    if (parent && typeof index === "number" && isParagraph) {
      if (
        isNeedCleanInnerParagraph(parent) ||
        isNeedCleanOuterParagraph(node.children || [])
      ) {
        splice.apply(parent.children, [index, 1, ...(node.children || [])]);

        return [SKIP, index];
      }
    }
  }

  return (root: Node) => {
    visit(root, visitor as any);
  };
}

export default remarkDropUnnecessaryParagraph;

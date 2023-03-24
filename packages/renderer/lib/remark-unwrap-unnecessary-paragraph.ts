import { isJsxElement, Node } from "./utils";
import { visit, SKIP } from "unist-util-visit";

const splice = ([] as Node[]).splice;
const some = ([] as any[]).some;

const isNeedCleanInnerParagraph = (node: Node) => {
  return isJsxElement(node) || ["mdxBlockElement"].includes(node?.type || "");
};
const isNeedCleanOuterParagraph = (nodes: Node[]) => {
  // not all inline
  return some.apply(nodes, [
    (child) => {
      return (
        ["div"].includes(child.name || "") ||
        ["div"].includes(child.type || "") ||
        isJsxElement(child)
      );
    },
  ]);
};

const paragraph = "paragraph";

function visitor(node: Node, index: number | null, parent: Node | undefined) {
  // if there are children available keep diving into them
  if (Array.isArray(node.children)) {
    node.children.forEach(function (child) {
      visit(child, visitor as any);
    });
  }

  // if an mdxBlockElement has a paragraph as a child, remove the paragraph layer
  if (parent && index && node.type === paragraph) {
    if (
      isNeedCleanInnerParagraph(parent) ||
      isNeedCleanOuterParagraph(node.children || [])
    ) {
      splice.apply(parent.children, [index, 1, ...(node.children || [])]);

      console.log(parent, isNeedCleanOuterParagraph(node.children || []));
      return [SKIP, index];
    }
  }
}

// https://github.com/mdx-js/mdx/issues/1170#issuecomment-725622285
function remarkUnwrapUnnecessaryParagraph() {
  return (root: Node) => {
    visit(root, visitor as any);
  };
}

export default remarkUnwrapUnnecessaryParagraph;

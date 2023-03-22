import { visitor, Node, isJsxElement } from "./utils";

const splice = ([] as Node[]).splice;
const isNeedClearParagraph = (node: Node) => {
  return isJsxElement(node) || ["mdxBlockElement"].includes(node?.type || "");
};
const paragraph = "paragraph";

// https://github.com/mdx-js/mdx/issues/1170#issuecomment-725622285
function remarkUnwrapUnnecessaryParagraph() {
  return (root: Node) => {
    visitor(
      root,
      () => true,
      (node, index, parent) => {
        if (
          node?.type === paragraph &&
          parent &&
          isNeedClearParagraph(parent)
        ) {
          splice.apply(parent.children, [index, 1, ...(node.children || [])]);
        }
      }
    );
  };
}

export default remarkUnwrapUnnecessaryParagraph;

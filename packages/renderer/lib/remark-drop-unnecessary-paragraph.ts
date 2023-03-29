import { visit, SKIP } from "unist-util-visit";

import type { Plugin } from "unified";
import type { Root, Content } from "mdast";

type Node = Content & { children?: Content };

const isJsxElement = (node: Content) => node.type?.startsWith("mdxJsx");

const splice = ([] as Content[]).splice;
const paragraph = "paragraph";

export const DefaultOption = {
  unwrapTags: (node: Content) =>
    ["div", "aside", "header", "image", "main", "figure"].includes(
      node.type || ""
    ) || isJsxElement(node),
  noIncludeTags: (node: Content) =>
    ["mdxBlockElement"].includes(node.type || "") || isJsxElement(node),
};

export type RemarkDropParagraphOption = Partial<typeof DefaultOption>;

// https://github.com/mdx-js/mdx/issues/1170#issuecomment-725622285
const remarkDropParagraph: Plugin<[RemarkDropParagraphOption?], Root> = (
  options
) => {
  const { unwrapTags = () => false, noIncludeTags = () => false } =
    Object.assign({}, DefaultOption, options);

  const isNeedCleanInnerParagraph = (node: Content) => {
    return noIncludeTags(node);
  };

  const isNeedCleanOuterParagraph = (node: Content) => {
    return unwrapTags(node);
  };

  const travelChildren = (nodes: Content[]) => {
    let paragraphChildren: Content[] = [];
    const wrap = () =>
      ({
        type: "paragraph",
        children: paragraphChildren,
        position: paragraphChildren[0]?.position,
      } as Content);

    let needClean = false;

    return {
      children: nodes.reduce((acc, cur, idx) => {
        if (isNeedCleanOuterParagraph(cur)) {
          needClean = true;
          const ret = [...acc, wrap(), cur];
          paragraphChildren = [];

          return ret;
        } else {
          paragraphChildren.push(cur);

          if (idx >= nodes.length - 1 && paragraphChildren.length > 0) {
            return [...acc, wrap()];
          } else {
            return acc;
          }
        }
      }, [] as Content[]),
      needClean,
    };
  };

  function visitor(node: Node, index: number | null, parent: Node | undefined) {
    // if there are children available keep diving into them
    if (Array.isArray(node.children)) {
      node.children.forEach(function (child) {
        visit(child, visitor as any);
      });
    }

    const isParagraph = node.type === paragraph;

    if (isParagraph && parent && typeof index === "number") {
      if (isNeedCleanInnerParagraph(parent)) {
        splice.apply(parent.children, [index, 1, node.children || []]);

        return [SKIP, index];
      }

      const { needClean, children } = travelChildren(node.children || []);
      if (needClean) {
        splice.apply(parent.children, [index, 1, ...children]);

        return [SKIP, index];
      }
    }
  }

  return (root: Root) => {
    visit(root, visitor as any);
  };
};

export default remarkDropParagraph;

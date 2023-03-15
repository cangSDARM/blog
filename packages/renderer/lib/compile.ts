import { promises } from "fs";
import { compile } from "@mdx-js/mdx";
import remarkHeadings from "@vcarl/remark-headings";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";

export async function compileMdx(fullPath: string) {
  try {
    const fileContents = await promises.readFile(fullPath, "utf-8");

    const compiled = await compile(fileContents, {
      outputFormat: "function-body",
      development: false,
      jsx: false,
      remarkPlugins: [
        remarkPresetLintConsistent,
        remarkHeadings,
        remarkUnwrapImages,
        remarkMath,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["anchor", "after"],
              ariaHidden: true,
              ariaLabel: "permalink",
              tabIndex: -1,
            },
            content: {
              type: "element",
              tagName: "svg",
              properties: {
                xmlns: "http://www.w3.org/2000/svg",
                width: 16,
                height: 16,
                viewBox: "0 0 16 16",
                focusable: "false",
              },
              children: [
                {
                  type: "element",
                  tagName: "path",
                  properties: {
                    d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
                    fillRule: "evenodd",
                  },
                },
              ],
            },
          },
        ],
        [rehypePrism, { ignoreMissing: true }],
        rehypeKatex,
      ],
    });

    if (compiled) {
      return {
        content: String(compiled.value),
        ...compiled.data,
      } as CompileAst;
    }
  } catch (e) {
    console.warn(`Error while compile mdx at ${fullPath}`, e);
  }
}

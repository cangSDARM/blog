import { readFileSync } from "fs";
import { compile } from "@mdx-js/mdx";
import remarkHeadings from "@vcarl/remark-headings";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export type CompileAst = {
  /** contains the compiled mdx sources */
  content: string;
  headings: any[];
};

export async function compileMdx(fullPath: string) {
  try {
    const fileContents = readFileSync(fullPath, "utf-8");

    const compiled = await compile(fileContents, {
      outputFormat: "function-body",
      development: false,
      remarkPlugins: [
        remarkHeadings,
        remarkMath,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
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

import { readFile } from 'fs/promises';
import { compile, CompileOptions } from '@mdx-js/mdx';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkMdxFrontmatter, { Traveler } from '@allen/remark-mdx-frontmatter';
import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import assert from 'assert';

export type CompileConfig = {
  remarkPlugins?: CompileOptions['remarkPlugins'];
  rehypePlugins?: CompileOptions['rehypePlugins'];
  mdAbsPath: string;
};

export async function compileMdx({
  remarkPlugins = [],
  rehypePlugins = [],
  mdAbsPath,
}: CompileConfig) {
  try {
    const fileContents = await readFile(mdAbsPath, { encoding: 'utf-8' });

    let frontmatter: any = undefined;

    // TODO: gather all assets src; reference: https://github.com/Pondorasti/remark-img-links
    const remarks: any[] = [
      remarkPresetLintConsistent,
      remarkHeadings,
      remarkUnwrapImages,
      remarkMath,
      remarkFrontmatter,
      [
        remarkMdxFrontmatter,
        {
          nodeTravel: ((data) => {
            frontmatter = data;
            return false;
          }) as Traveler,
        },
      ],
    ].concat(...remarkPlugins);
    const rehypes: any[] = [
      [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              className: ['anchor', 'after'],
              ariaHidden: true,
              ariaLabel: 'permalink',
              tabIndex: -1,
            },
            content: {
              type: 'element',
              tagName: 'svg',
              properties: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 16,
                height: 16,
                viewBox: '0 0 16 16',
                focusable: 'false',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    fillRule: 'evenodd',
                  },
                },
              ],
            },
          },
        ],
        rehypeKatex,
      ],
    ].concat(...(rehypePlugins as any));

    const compiled = await compile(fileContents, {
      outputFormat: 'function-body',
      development: false,
      jsx: true,
      remarkPlugins: remarks,
      rehypePlugins: rehypes,
    });

    assert.ok(compiled);

    return {
      content: compiled.value.toString(),
      ...compiled.data,
      frontmatter,
    } as const;
  } catch (e) {
    console.error(`Error while compile mdx at ${mdAbsPath}`);
    throw e;
  }
}

type _CompileResult = ReturnType<typeof compileMdx>;
type PromiseValue<T> = T extends Promise<infer R> ? PromiseValue<R> : T;
export type CompileResult = PromiseValue<_CompileResult>;

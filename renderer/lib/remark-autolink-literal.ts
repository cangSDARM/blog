/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('micromark-extension-gfm-autolink-literal').Options & import('mdast-util-gfm-autolink-literal').Options} Options
 */

import { gfmAutolinkLiteral } from "micromark-extension-gfm-autolink-literal";
import {
  gfmAutolinkLiteralFromMarkdown,
  gfmAutolinkLiteralToMarkdown,
} from "mdast-util-gfm-autolink-literal";

/**
 * Plugin to support GFM (autolink literals).
 *
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkGfmAutolinkLiteral(this: any, options = {}) {
  const data = this.data();

  add("micromarkExtensions", gfmAutolinkLiteral());
  add("fromMarkdownExtensions", gfmAutolinkLiteralFromMarkdown());
  add("toMarkdownExtensions", gfmAutolinkLiteralToMarkdown());

  function add(field: string, value: unknown) {
    const list /** @type {unknown[]} */ =
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = []);

    list.push(value);
  }
}

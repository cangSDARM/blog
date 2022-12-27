import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { siteMetadata } from './src/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    react(),
    sitemap(),
  ],
  base: siteMetadata.base,
  trailingSlash: "never",
  output: "static",
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: "prism",
  },
});

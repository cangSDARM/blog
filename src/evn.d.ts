/// <reference types="@astrojs/image/client" />

interface Mdx<T = {}> {
  frontmatter: Record<string, any> & T & { title: string };
  getHeadings: any;
  url: string;
  file: string;
  rawContent: string;
}

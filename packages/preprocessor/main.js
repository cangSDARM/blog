const worker = require("./dist/index");
const path = require("path");
const remarkUnwrapImages = require("remark-unwrap-images");
const remarkMath = require("remark-math");
const rehypeSlug = require("rehype-slug");
const rehypeAutolinkHeadings = require("rehype-autolink-headings");
const rehypeKatex = require("rehype-katex");
const rehypePrismPlus = require("rehype-prism-plus");

const renderer = path.join(__dirname, "../renderer");
const ExtraPlugins = worker.ExtraPlugins;
const Option = new worker.Option(new worker.Writers.NextWriter());

Option.setIgnorePathPatten("*haskell/**");
Option.addPlugin("remark", ExtraPlugins.remarkUnwrapUnnecessaryParagraph);
Option.addPlugin("remark", remarkUnwrapImages);
Option.addPlugin("remark", remarkMath);
Option.addPlugin("rehype", rehypeSlug);
Option.addPlugin("rehype", [
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
]);
Option.addPlugin("rehype", [rehypePrismPlus, { ignoreMissing: true }]);
Option.addPlugin("rehype", rehypeKatex);

worker
  .default({
    input: path.join(renderer, "./mdx"),
    output: path.join(renderer, "./pages"),
    option: Option,
  })
  .then(() => {});

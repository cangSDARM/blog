type MdxComponents = Record<string, React.ReactComponentElement>;

type MdxComponent = React.ExoticComponent<{
  components?: MdxComponents;
}>;

type Frontmatter = Record<string, any> & { title: string };

type CompileAst = {
  /** contains the compiled mdx sources */
  content: string;
  headings: any[];
};

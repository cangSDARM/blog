type TemplateProps = {
  frontmatter: Frontmatter;
  compiled: Omit<CompileAst, "content">;
  children: (components: MdxComponents) => React.ReactElement;
};

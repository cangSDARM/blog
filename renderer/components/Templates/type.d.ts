type TemplateProps = {
  frontmatter: Frontmatter;
  compiled: Omit<CompileAst, "content">;
  children: (components: MdxComponents) => React.ReactElement;
};

type MixStyled = {
  rootStyle?: string;
};

type TemplateComponent = React.FC<TemplateProps> & MixStyled;

type TemplateProps = {
  frontmatter: Frontmatter;
  children: (components: MdxComponents) => React.ReactElement;
};

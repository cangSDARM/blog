type MdxComponents = Record<string, React.ReactElement>;

type MdxComponent = React.ExoticComponent<{
  components?: MdxComponents;
}>;

type Frontmatter = Record<string, any> & { title: string };

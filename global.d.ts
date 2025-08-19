type ArrayItem<T extends any[]> = T extends (infer S)[] ? S : never;

type Overview = {
  length: number;
  name: string;
};

type Tag = {
  collection: string;
  url: string;
  matter: Frontmatter;
};

type MdxComponents = Record<string, React.ReactComponentElement>;

type MdxComponent = React.ExoticComponent<{
  components?: MdxComponents;
}>;

type Frontmatter = Record<string, any> & { title: string };

type TOCItem = {
  depth: number;
  id: string;
  value?: string;
  children?: TOCItem[];
};
type CompileAst = {
  /** contains the compiled mdx sources */
  content: string;
  toc: TOCItem[];
};

type Defined<T> = Exclude<T, undefined | null>;

declare module "react-multiline-clamp" {
  export default React.FC<any>;
}

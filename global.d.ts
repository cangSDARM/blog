type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

type OverridableProps<E = {}, O = {}> = O & Omit<E, keyof O>;

type InheritableElementProps<
  C extends React.ElementType,
  P = {},
  // replace to React.ComponentPropsWithRef will same error
> = OverridableProps<React.ComponentPropsWithoutRef<C>, P>;

type PolymorphicComponentProps<
  C extends React.ElementType,
  P = {},
> = InheritableElementProps<C, P & AsProp<C>>;

type ArrayItem<T extends any[]> = T extends (infer S)[] ? S : never;

type Maybe<T> = T | null | undefined;

type PartialRequired<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

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

import React from "react";
import * as runtime from "react/jsx-runtime";
import { runSync } from "@mdx-js/mdx";

type Props = {
  code: string;
};

const useMdxRenderer = ({
  code,
}: Props): [Component: MdxComponent, frontmatter: Frontmatter] => {
  const { default: MdxModuleComponent, ...rest } = React.useMemo(
    () =>
      // @ts-expect-error: the automatic react runtime is untyped.
      runSync(code, { ...runtime, baseUrl: import.meta.url }) as {
        default: MdxComponent;
      },
    [code]
  );

  return [MdxModuleComponent, (rest as any).frontmatter];
};

export default useMdxRenderer;

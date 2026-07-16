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
      runSync(code, { ...runtime, baseUrl: import.meta.url }) as {
        default: MdxComponent;
      },
    [code]
  );
  const frontmatter = React.useMemo(() => {
    const { frontmatter, ...extra } = rest as any;
    return Object.assign({}, frontmatter, extra);
  }, [rest]);

  return [MdxModuleComponent, frontmatter];
};

export default useMdxRenderer;

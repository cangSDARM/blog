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
      runSync(code, runtime) as {
        default: MdxComponent;
      },
    [code]
  );

  return [MdxModuleComponent, rest as any];
};

export default useMdxRenderer;

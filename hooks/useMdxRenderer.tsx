import React from "react";
import * as runtime from "react/jsx-runtime";
import { runSync } from "@mdx-js/mdx";

type Props = {
  code: string;
};

const useMdxRenderer = ({
  code,
}: Props): [Component: MdxComponent, frontmatter: Frontmatter] => {
  const { default: MdxModuleComponent, ...rest } = runSync(code, runtime) as {
    default: MdxComponent;
  };

  return [MdxModuleComponent, rest as any];
};

export default useMdxRenderer;

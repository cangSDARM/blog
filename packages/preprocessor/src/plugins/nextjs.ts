import NodePath from 'path';
import { unix } from '../utils/path-extra';
import { Plugin } from '../output';

export default <Plugin>{
  writeComp: async (ctx) => {
    const {
      compiledResult: { content, error },
    } = ctx;
    const contents = !!error ? 'export default {};' : content;
    const outputContent = `
import react from 'react';
export default function() {
${contents}
}`;

    return ctx.write(outputContent);
  },
  writeEntry: async (ctx) => {
    const {
      compiledResult: { data },
      outputAbsPath,
      componentPath,
    } = ctx;
    const relativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        componentPath(outputAbsPath)
      )
    );

    const outputContent = `
import Content from "./${relativePath}";
import react from 'react';
const result = ${JSON.stringify(data, null, 2)};
const { ['default']: MdxComponent, ...rest } = Content(react);
export default Object.assign(result, rest, { MdxComponent, });
`;

    return ctx.write(outputContent);
  },
};

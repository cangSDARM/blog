import NodePath from 'path';
import { unix } from '../../utils/path-extra';
import { Plugin } from '../../output';

export default <Plugin>{
  writeComponent: async (ctx) => {
    const {
      compiledResult: { content, error },
    } = ctx;
    const contents = !!error ? 'export default {};' : content;
    const outputContent = `
import react from 'react';
function Component() {
${contents}
}
export default Component;`;

    return ctx.write(outputContent);
  },
  writeFrontmatter: async (ctx) => {
    const {
      compiledResult: { data },
    } = ctx;

    const outputContent = `
${JSON.stringify(data, null, 2)}`;

    return ctx.write(outputContent);
  },
  writeEntry: async (ctx) => {
    const { handledPaths, outputAbsPath } = ctx;
    const componentRelativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        handledPaths['Component']
      )
    );
    const frontmatterRelativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        handledPaths['Frontmatter']
      )
    );

    const outputContent = `
import Content from "./${componentRelativePath}";
import Frontmatter from "./${frontmatterRelativePath}";
import react from 'react';
const { ['default']: MdxComponent, ...rest } = Content(react);

function Entry() {
  console.log(Frontmatter);
  return <MdxComponent />;
}
export default Entry;
`;

    return ctx.write(outputContent);
  },
};

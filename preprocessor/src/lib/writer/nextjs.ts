import NodePath from "path";
import { unix } from "../utils/path-extra";
import { Writer, WriterCtx } from "./types";

export class NextWriter extends Writer {
  async writeComponent(ctx: WriterCtx) {
    const {
      compiledResult: { content, error },
    } = ctx;
    const contents = !!error ? "export default {};" : content;
    const outputContent = `
import react from 'react';
function Component() {
${contents}
}
export default Component;`;

    return ctx.write(outputContent);
  }

  async writeEntry(ctx: WriterCtx) {
    const { handledPaths, outputAbsPath } = ctx;
    ctx.getPath = (base) => base + ".jsx";

    const componentRelativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        handledPaths["Component"]
      )
    );
    const frontmatterRelativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        handledPaths["Frontmatter"]
      )
    );

    const componentProcessStr = `const { ['default']: MdxComponent, ...rest } = Content(react);`;
    const defaultContent = `
import Content from "./${componentRelativePath}";
import Frontmatter from "./${frontmatterRelativePath}";
import react from 'react';

${componentProcessStr}

function Entry() {
  return <MdxComponent />;
}

export default Entry;
`;

    return ctx.write(
      this.entryContent
        ? this.entryContent(ctx, {
            componentRelativePath,
            frontmatterRelativePath,
            componentProcessStr,
            defaultContent,
          })
        : defaultContent
    );
  }

  override async writeFrontmatter(ctx: WriterCtx) {
    const {
      compiledResult: { data },
    } = ctx;

    const outputContent = `
${JSON.stringify(data, null, 2)}`;

    return ctx.write(outputContent);
  }
}

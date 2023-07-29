import NodePath from "path";
import { unix } from "../utils/path-extra";
import { WriterCtx, Writer } from "./types";

export class VanillaWriter extends Writer {
  async writeComponent(ctx: WriterCtx) {
    const {
      compiledResult: { content, error },
    } = ctx;
    const contents = !!error ? "export default {};" : content;
    const outputContent = `
import react from 'react';
export default function() {
${contents}
}`;

    return ctx.write(outputContent);
  }

  async writeEntry(ctx: WriterCtx) {
    const {
      compiledResult: { data },
      outputAbsPath,
      handledPaths,
    } = ctx;
    const componentRelativePath = unix(
      NodePath.relative(
        NodePath.dirname(outputAbsPath),
        handledPaths["Component"]
      )
    );

    const componentProcessStr = `const { ['default']: MdxComponent, ...rest } = Content(react);`;

    const defaultContent = `
import Content from "./${componentRelativePath}";
import react from 'react';
const result = ${JSON.stringify(data, null, 2)};
${componentProcessStr}
export default Object.assign(result, rest, { MdxComponent, });
`;

    return ctx.write(
      this.entryContent
        ? this.entryContent(ctx, {
            componentRelativePath,
            defaultContent,
            componentProcessStr,
          })
        : defaultContent
    );
  }
}

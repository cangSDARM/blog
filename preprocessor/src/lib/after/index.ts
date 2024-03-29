import { base } from "../utils/path-extra";
import { writeFile } from "../utils/fs-extra";
import { CompileResult } from "../compile";
import assert from "assert";
import { mkdir } from "../utils/fs-extra";
import { Log } from "../utils/log";
import { dirname } from "path";
import type { WriterCtx, Writer } from "../writer";

export interface IAfterConfig {
  writer: Writer;
}

export const afterLog = new Log();

const preWrite = (ctx: WriterCtx, cfgBag: { For: string; ext: string }) => {
  ctx.getPath = (base) => base + cfgBag.ext;
  ctx.write = async (content) => {
    content = content.trim();
    const writePath = ctx.getPath(base(ctx.outputAbsPath));

    await writeFile(writePath, content, {
      overwrite: true,
    });

    ctx.handledPaths = { ...ctx.handledPaths, [cfgBag.For]: writePath };
  };
};

export async function* process(
  outputAbsPath: string,
  compiled: CompileResult,
  config: IAfterConfig
) {
  afterLog.assertOk(compiled);

  const { content, ...restResult } = compiled;
  const ctx: WriterCtx = {
    outputAbsPath,
    handledPaths: {},
    compiledResult: {
      data: restResult || {},
      content: content || "",
      error: !!content ? undefined : "error",
    },
    getPath: () => outputAbsPath,
    async write(content: string) {},
  };

  async function* procedure(theModule: Writer) {
    const dir = dirname(ctx.outputAbsPath);
    yield await mkdir(dir);

    const steps = [
      {
        For: "Component",
        ext: ".comp.js",
        writer: theModule.writeComponent,
      },
      {
        For: "Frontmatter",
        ext: ".frontmatter.json",
        writer: theModule.writeFrontmatter,
      },
      {
        For: "Entry",
        ext: ".entry.js",
        writer: theModule.writeEntry,
      },
    ];
    for (const step of steps) {
      await preWrite(ctx, { For: step.For, ext: step.ext });
      yield await step.writer?.(ctx);
    }
  }

  afterLog.assertOk(config.writer);
  yield* procedure(config?.writer);
  await afterLog.log(outputAbsPath, {
    outputFiles: ctx.handledPaths,
  });
}

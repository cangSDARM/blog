import { base } from './utils/path-extra';
import { writeFile } from './utils/fs-extra';
import { CompileResult } from './compile';
import assert from 'assert';

type CommonCtx = {
  outputAbsPath: string;
  componentPath: (outputAbsPath: string) => string;
  entryPath: (outputAbsPath: string) => string;
};
type Writer = (
  ctx: CommonCtx & { outputContent: string }
) => Promise<void> | void;

export type OutputCtx = {
  compiledResult: {
    data: Record<string, any>;
    error?: unknown;
    content: string;
  };
  write: (content: string) => Promise<void> | void;
} & CommonCtx;
type PluginWriter = (ctx: OutputCtx) => Promise<void> | void;
export type Plugin = {
  writeComp: PluginWriter;
  writeEntry: PluginWriter;
};

const writeComp: Writer = ({ outputContent, componentPath, outputAbsPath }) => {
  return writeFile(componentPath(outputAbsPath), outputContent, {
    overwrite: false,
  });
};

const writeEntry: Writer = ({ outputContent, entryPath, outputAbsPath }) => {
  return writeFile(entryPath(outputAbsPath), outputContent, {
    overwrite: false,
  });
};

export type OutConfig = {
  type?: 'vanilla' | 'nextjs' | 'custom';
  customPlugin?: Plugin;
};

export async function* process(
  writeFile: string,
  compiled: CompileResult,
  config?: OutConfig
) {
  assert.ok(compiled);

  const componentPath = (file: string) => base(file) + '.comp.js';
  const entryPath = (file: string) => base(file) + '.js';
  const { content, ...restResult } = compiled;
  const commonCtx: CommonCtx = {
    outputAbsPath: writeFile,
    componentPath,
    entryPath,
  };
  const ctx: OutputCtx = Object.assign(commonCtx, {
    compiledResult: {
      data: restResult || {},
      content: content || '',
      error: !!content ? undefined : 'error',
    },
    write(content: string) {},
  });
  const write = (writer: Writer) => {
    ctx.write = (content: string) => {
      writer({
        ...commonCtx,
        outputContent: content.trim(),
      });
    };
  };

  /// TODO: make utils to gather message, make frontend less filter/merge

  async function* steps(module: Plugin) {
    write(writeComp);
    yield await module.writeComp(ctx);
    write(writeEntry);
    yield await module.writeEntry(ctx);
  }

  // don't support dynamic resolve import path
  switch (config?.type) {
    case 'custom':
      assert.ok(config.customPlugin);
      yield* steps(config.customPlugin);
    case 'nextjs':
      const Nextjs = await import('./plugins/nextjs');
      yield* steps(Nextjs.default);
    case 'vanilla':
    default:
      const Vanilla = await import('./plugins/vanilla');
      yield* steps(Vanilla.default);
  }
}

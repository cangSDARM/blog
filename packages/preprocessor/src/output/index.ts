import { base } from '../utils/path-extra';
import { writeFile } from '../utils/fs-extra';
import { CompileResult } from '../compile';
import assert from 'assert';
import { mkdir } from '../utils/fs-extra';
import { dirname } from 'path';
import type { OutputCtx, Plugin, OutConfig, StepObject } from './types';

export { OutputCtx, Plugin, OutConfig };

const steps: StepObject[] = [
  { name: 'Component', ext: '.comp.js', action: 'write' },
  { name: 'Frontmatter', ext: '.fm.json', action: 'write' },
  { name: 'Entry', ext: '.js', action: 'write' },
];

async function* procedure(
  theModule: Plugin,
  prelude: (step: StepObject) => OutputCtx
) {
  const handledSteps = theModule.controlStep
    ? theModule.controlStep(steps)
    : steps;

  let curStep = handledSteps.shift();
  while (curStep) {
    const ctx = prelude(curStep);
    const stepFn = curStep.action + curStep.name;
    if (!stepFn || !theModule[stepFn]) {
      console.warn('missing step: %s', stepFn);
    } else {
      const result = await theModule[stepFn](ctx);
      yield result;
    }
    curStep = handledSteps.shift();
  }
}

export async function* process(
  outputAbsPath: string,
  compiled: CompileResult,
  config?: OutConfig
) {
  assert.ok(compiled);

  const { content, ...restResult } = compiled;
  const ctx: OutputCtx = {
    outputAbsPath,
    stepIndex: 0,
    handledPaths: {},
    compiledResult: {
      data: restResult || {},
      content: content || '',
      error: !!content ? undefined : 'error',
    },
    getPath: () => outputAbsPath,
    async write(content: string) {},
  };
  const write = (For: string, ext: string) => {
    ctx.getPath = (base) => base + ext;
    ctx.write = async (content: string) => {
      content = content.trim();
      const writePath = ctx.getPath(base(outputAbsPath));

      await writeFile(writePath, content, {
        overwrite: true,
      });

      ctx.stepIndex++;
      ctx.handledPaths = { ...ctx.handledPaths, [For]: writePath };
    };
  };

  async function* wrapProcedure(theModule: Plugin) {
    const dir = dirname(ctx.outputAbsPath);
    yield await mkdir(dir);

    // allow us overwrite module behavior
    theModule = Object.assign(theModule, config?.customPlugin);
    yield* procedure(theModule, (curStep: StepObject) => {
      write(curStep.name, curStep.ext);

      return ctx;
    });

    // TODO: gather information here
  }

  // don't support dynamic resolve import path
  switch (config?.type) {
    case 'custom':
      assert.ok(config.customPlugin);
      yield* wrapProcedure(config.customPlugin);
      break;
    case 'nextjs':
      const Nextjs = await import('./plugins/nextjs');
      yield* wrapProcedure(Nextjs.default);
      break;
    case 'vanilla':
    default:
      const Vanilla = await import('./plugins/vanilla');
      yield* wrapProcedure(Vanilla.default);
  }
}

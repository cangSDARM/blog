import { compileMdx, CompileConfig } from './compile';
import { mkdir } from './utils/fs-extra';
import path from 'path';
import { InputConfig, process as ipProcess } from './input';
import { workspace } from './utils/path-extra';
import { process as opProcess, OutConfig } from './output';
import { rimraf } from 'rimraf';

type PreprocessorConfig = {
  input: string;
  output?: string;
  inputOption?: InputConfig;
  compileOption?: CompileConfig;
  outputOption?: OutConfig;
};

export default async ({
  input,
  inputOption,
  output = 'dist',
  compileOption,
  outputOption,
}: PreprocessorConfig) => {
  const absIn = workspace(input, true);
  const absOut = workspace(output, true);

  // TODO: make caches
  await rimraf(absOut);
  for await (const chunk of ipProcess(absIn, inputOption)) {
    const relative = path.relative(absIn, chunk);
    const out = path.join(absOut, relative);
    const dir = path.dirname(out);

    await mkdir(dir);

    const result = await compileMdx({ mdAbsPath: chunk, ...compileOption });

    for await (const _ of opProcess(out, result, outputOption)) {
      //
    }
  }
  console.log('end');
};

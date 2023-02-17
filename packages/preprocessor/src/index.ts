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

const DefaultOutputOption: OutConfig = { noCache: false };
const DefaultInputOption: InputConfig = {};

export default async ({
  input,
  inputOption,
  output = 'dist',
  compileOption,
  outputOption,
}: PreprocessorConfig) => {
  const absIn = workspace(input, true);
  const absOut = workspace(output, true);

  inputOption = Object.assign(DefaultInputOption, inputOption);
  outputOption = Object.assign(DefaultOutputOption, outputOption);

  if (outputOption?.noCache) {
    await rimraf(absOut);
  }
  for await (const chunk of ipProcess(absIn, inputOption)) {
    const relative = path.relative(absIn, chunk);
    const out = path.join(absOut, relative);

    const result = await compileMdx({ mdAbsPath: chunk, ...compileOption });

    for await (const _ of opProcess(out, result, outputOption)) {
      //
    }
  }
  console.log('end');
};

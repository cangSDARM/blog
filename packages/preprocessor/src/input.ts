import { openDir, OpenDirOptions } from './utils/fs-extra';

export type InputConfig = OpenDirOptions & {};

export async function* process(input: string, options?: InputConfig) {
  for await (const filePath of openDir(input, options)) {
    yield filePath;
  }
}

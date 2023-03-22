import { openDir, OpenDirOptions } from "../utils/fs-extra";

export async function* process(input: string, options?: IBeforeConfig) {
  for await (const filePath of openDir(input, options)) {
    yield filePath;
  }
}

export interface IBeforeConfig extends OpenDirOptions {}

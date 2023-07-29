import { openDir, OpenDirOptions } from "../utils/fs-extra";
import { Log } from "../utils/log";

export const beforeLog = new Log();

export async function* process(input: string, ctx: IBeforeConfig) {
  try {
    for await (const filePath of openDir(input, ctx)) {
      yield filePath;
    }
  } catch (e: any) {
    beforeLog.fail(`Error while processing ${input}.\n`, e);
    throw e;
  }
}

export interface IBeforeConfig extends OpenDirOptions {}

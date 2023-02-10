import { join, normalize } from 'path';
import { Dir, promises, createWriteStream } from 'fs';
import { isMatch, unix } from './path-extra';
import { mkdirp } from 'mkdirp';

export type OpenDirOptions = {
  ignore: string;
};

type OpenDirParams = [directory: string, options?: OpenDirOptions];

export const openDir = async function* (
  ...[directory, options]: OpenDirParams
) {
  const dirs: (Promise<Dir> | null)[] = [];

  const needOpen = (path: string) =>
    dirs.push(promises.opendir(normalize(path)));

  const validateGlob = (path: string) => {
    if (!options?.ignore) return true;

    path = unix(path);

    return !isMatch(path, options.ignore);
  };

  needOpen(directory);

  while (true) {
    const dir = await dirs.shift();
    if (!dir) {
      break;
    }

    while (true) {
      const file = await dir.read();
      if (!file) {
        await dir.close();
        break;
      }

      if (file?.isDirectory()) {
        const subDir = join(dir.path, file.name);
        if (validateGlob(subDir)) {
          needOpen(subDir);
        }
        continue;
      }

      const filePath = join(dir.path, file.name);
      if (!validateGlob(filePath)) continue;

      yield filePath;
    }
  }
};

export const mkdir = (
  ...args: Parameters<typeof mkdirp>
): ReturnType<typeof mkdirp> => {
  return mkdirp(...args);
};

export const writeFile = (
  path: string,
  content: string,
  config?: { overwrite?: boolean }
) => {
  const { overwrite }: Required<typeof config> = Object.assign(
    { overwrite: true },
    config
  );
  const flags = !overwrite ? 'wx' : 'w';

  return new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(path, {
      encoding: 'utf-8',
      mode: 0o666,
      flags,
      highWaterMark: 128 * 1024, //128kib
    });

    stream.write(content);

    stream.once('finish', () => {
      stream.close();
      resolve();
    });
    stream.on('error', reject);
  });
};

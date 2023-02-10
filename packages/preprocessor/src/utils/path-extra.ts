import { join, sep, relative, isAbsolute, parse } from 'path';

import { isMatch as MatcherIsMatch } from 'matcher';

export const isMatch: typeof MatcherIsMatch = (...args) => {
  const result = MatcherIsMatch(...args);

  if (result) {
    console.log(args);
  }

  return result;
};

export const unix = (path: string): string => {
  return path.replaceAll(sep, '/');
};

/** return file path without ext */
export const base = (path: string) => {
  const parsed = parse(path);

  return `${parsed.dir}${sep}${parsed.name}`;
};

/** return abspath if abs=true, else cwd() related path */
export const workspace = (path: string, abs = false): string => {
  if (isAbsolute(path)) {
    try {
      throw new Error();
    } catch (e) {
      // TODO: info log this
      console.warn(
        `path: "${path}" is a absolute path\n`,
        'stack:',
        (e as Error).stack
      );
    }
  }

  const related = relative(process.cwd(), path);

  if (abs) {
    return join(process.cwd(), related);
  }

  return related;
};

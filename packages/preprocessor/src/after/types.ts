export type OutputCtx = {
  readonly outputAbsPath: string;
  readonly compiledResult: {
    data: Record<string, any>;
    error?: unknown;
    content: string;
  };
  handledPaths: Record<string, string>;
  /** get current path to write. you can rewrite this to overwrite default ext or file path. */
  getPath: (base: string) => string;
  write: (content: string) => Promise<void>;
};

type PluginWriter = (ctx: OutputCtx) => Promise<void> | void;

export abstract class Plugin {
  abstract writeComponent: PluginWriter;
  abstract writeEntry: PluginWriter;
  writeFrontmatter?: PluginWriter;
};

export type OutConfig = {
  type?: 'vanilla' | 'nextjs' | 'custom';
  customPlugin?: Plugin;
  noCache?: boolean;
};

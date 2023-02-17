export type OutputCtx = {
  outputAbsPath: string;
  compiledResult: {
    data: Record<string, any>;
    error?: unknown;
    content: string;
  };
  stepIndex: number;
  handledPaths: Record<string, string>;
  /** get current path to write. you can rewrite this to overwrite default ext or file path. */
  getPath: (base: string) => string;
  write: (content: string) => Promise<void>;
};
export type StepObject = {
  name: string;
  ext: string;
  action: string;
};

type PluginWriter = (ctx: OutputCtx) => Promise<void> | void;
export type Plugin = {
  writeComponent: PluginWriter;
  writeEntry: PluginWriter;
  writeFrontmatter: PluginWriter;
  controlStep?: (steps: StepObject[]) => StepObject[];
} & { [k: string]: PluginWriter };

export type OutConfig = {
  type?: 'vanilla' | 'nextjs' | 'custom';
  customPlugin?: Plugin;
  noCache?: boolean;
};

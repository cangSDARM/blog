type WriteResult = Promise<void>;

export type WriterCtx = {
  readonly outputAbsPath: string;
  readonly compiledResult: {
    data: Record<string, any>;
    error?: unknown;
    content: string;
  };
  handledPaths: Record<string, string>;
  /** get current path to write. you can rewrite this to overwrite default ext or file path.
   * 
   * @param base equal`base(ctx.outputAbsPath)`
   */
  getPath: (base: string) => string;
  /** write content to the file. */
  write: (content: string) => WriteResult;
};

export abstract class Writer {
  /** todo: make this as recma plugin */
  abstract writeComponent(ctx: WriterCtx): WriteResult;
  abstract writeEntry(ctx: WriterCtx): WriteResult;
  writeFrontmatter?(ctx: WriterCtx): WriteResult;

  entryContent?(
    ctx: WriterCtx,
    cfg: {
      /** @example
       * ```js
       * import Content from `./${componentRelativePath}`
       * ```
       * */
      componentRelativePath: string;
      /** @example
       * ```js
       * import Frontmatter from `./${frontmatterRelativePath}`
       * ```
       * */
      frontmatterRelativePath?: string;
      defaultContent: string;
      componentProcessStr: "const { ['default']: MdxComponent, ...rest } = Content(react);";
    }
  ): string;
}

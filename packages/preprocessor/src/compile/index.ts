import { readFile } from "fs/promises";
import { Log, Report } from "../utils/log";
import { compile, CompileOptions } from "@mdx-js/mdx";

export const compileLog = new Log();

export interface ICompileConfig {
  remarkPlugins: Defined<CompileOptions["remarkPlugins"]>;
  rehypePlugins: Defined<CompileOptions["rehypePlugins"]>;
  recmaPlugins: Defined<CompileOptions["rehypePlugins"]>;
  mdAbsPath: string;
}

export async function compileMdx(config: ICompileConfig) {
  const { remarkPlugins, rehypePlugins, recmaPlugins, mdAbsPath } = config;

  try {
    const fileContents = await readFile(mdAbsPath, { encoding: "utf-8" });

    const compiled = await compile(fileContents, {
      outputFormat: "function-body",
      development: false,
      jsx: true,
      remarkPlugins,
      rehypePlugins,
      recmaPlugins,
    });

    compileLog.assertOk(compiled);

    return {
      content: compiled.value.toString(),
      ...compiled.data,
    } as const;
  } catch (e) {
    compileLog.fail(`Error while compile: ${mdAbsPath}`);
    throw e;
  }
}

type _CompileResult = ReturnType<typeof compileMdx>;
type PromiseValue<T> = T extends Promise<infer R> ? PromiseValue<R> : T;
export type CompileResult = PromiseValue<_CompileResult>;

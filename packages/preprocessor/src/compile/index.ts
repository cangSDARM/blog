import { readFile } from "fs/promises";
import { compile, CompileOptions } from "@mdx-js/mdx";
import assert from "assert";

export interface ICompileConfig {
  remarkPlugins: Defined<CompileOptions["remarkPlugins"]>;
  rehypePlugins: Defined<CompileOptions["rehypePlugins"]>;
  recmaPlugins: Defined<CompileOptions["rehypePlugins"]>;
  mdAbsPath: string;
}

export async function compileMdx({
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
  mdAbsPath,
}: ICompileConfig) {
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

    assert.ok(compiled);

    return {
      content: compiled.value.toString(),
      ...compiled.data,
    } as const;
  } catch (e) {
    console.error(`Error while compile mdx at ${mdAbsPath}`);
    throw e;
  }
}

type _CompileResult = ReturnType<typeof compileMdx>;
type PromiseValue<T> = T extends Promise<infer R> ? PromiseValue<R> : T;
export type CompileResult = PromiseValue<_CompileResult>;

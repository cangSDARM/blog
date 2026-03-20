import ts from "typescript";
import { getContextId, IsolatedContext } from "./sandbox";

export const deconstruct = async (
  filename: string,
  context: IsolatedContext
) => {
  const document = context.document;
  const script = document.querySelector(`script[filename="${filename}"]`);
  if (script) {
    script.remove();
  }
};

export const execute = (
  code: string,
  config: { filename: string; context: IsolatedContext; nomodule: boolean }
) => {
  return new Promise<void>((resolve, reject) => {
    const { context, filename } = config;
    const document = context.document;
    const id = getContextId(context) + filename;

    if (document.querySelector(`script[id="${id}"]`)) {
      return resolve();
    }

    const script = document.createElement("script");
    script.onerror = reject;
    script.defer = true;
    if (!config.nomodule) script.type = "module";
    script.id = id;
    script.textContent = `${code}`;

    document.body.append(script);
    console.log("[CodeContainer] %s executed", filename);

    resolve();
  });
};

export const compile = async (code: string) => {
  // 调用 TS 官方 API 编译
  const result = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      strict: false,
      removeComments: true,
      noImplicitAny: true,
    },
    fileName: "temp.ts", // 虚拟文件名
  });

  if (result.diagnostics && result.diagnostics.length > 0) {
    throw new Error(
      result.diagnostics
        .map((diagnostic) => {
          const message = ts.flattenDiagnosticMessageText(
            diagnostic.messageText,
            "\n"
          );
          return `[${diagnostic.category}] L:${diagnostic.start}: ${message}`;
        })
        .join("\n")
    );
  }

  return result;
};

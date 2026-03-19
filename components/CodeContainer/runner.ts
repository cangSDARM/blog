import ts from "typescript";
import { IsolatedContext } from "./sandbox";

export const execute = (
  filename: string,
  code: string,
  context: IsolatedContext
) => {
  return new Promise<void>((resolve, reject) => {
    const document = context.document;
    if (document.querySelector(`script[filename="${filename}"]`)) {
      return resolve();
    }

    const script = document.createElement("script");
    script.onerror = reject;
    script.defer = true;
    script.setAttribute("filename", filename);
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
      strict: true,
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

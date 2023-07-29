import { compileMdx } from "./compile";
import path from "node:path";
import { process as beforeCompileProcess } from "./before";
import * as PathExtra from "./utils/path-extra";
import { process as afterCompileProcess } from "./after";
import { rimraf } from "rimraf";
import { Option } from "./option";
import { NextWriter, VanillaWriter } from "./writer";

type PreprocessorConfig = {
  input: string;
  output?: string;
  option: Option;
};

const Writers = { NextWriter, VanillaWriter };
const Utils = { path: PathExtra };

export { Option, Writers, Utils };

export default async ({
  input,
  output = "dist",
  option,
}: PreprocessorConfig) => {
  const absIn = PathExtra.workspace(input, true);
  const absOut = PathExtra.workspace(output, true);

  console.log("working on space:", { absIn, absOut });

  console.log("enabled plugins:", {
    remark: option.remarkPlugins,
    rehype: option.rehypePlugins,
    recma: option.recmaPlugins,
  });

  if (!option.hasCache) {
    await rimraf(absOut);
  }

  for await (const chunk of beforeCompileProcess(absIn, option)) {
    const relative = path.relative(absIn, chunk);
    const out = path.join(absOut, relative);
    option.mdAbsPath = chunk;

    // TODO: extends to other type file
    const result = await compileMdx(option);

    for await (const _ of afterCompileProcess(out, result, option)) {
      //
    }
  }
  option.printInfo();
  console.log("end");
};

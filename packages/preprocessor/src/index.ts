import { compileMdx } from "./compile";
import path from "path";
import { process as beforeCompileProcess } from "./before";
import { workspace } from "./utils/path-extra";
import { process as afterCompileProcess } from "./after";
import { rimraf } from "rimraf";
import { Option } from "./option";
import * as ExtraPlugins from "./unified";
import { NextWriter, VanillaWriter } from "./writer";

type PreprocessorConfig = {
  input: string;
  output?: string;
  option: Option;
};

const Writers = { NextWriter, VanillaWriter };

export { Option, ExtraPlugins, Writers };

export default async ({
  input,
  output = "dist",
  option,
}: PreprocessorConfig) => {
  const absIn = workspace(input, true);
  const absOut = workspace(output, true);

  if (!option.hasCache) {
    await rimraf(absOut);
  }
  for await (const chunk of beforeCompileProcess(absIn, option)) {
    const relative = path.relative(absIn, chunk);
    const out = path.join(absOut, relative);
    option.mdAbsPath = chunk;

    const result = await compileMdx(option);

    for await (const _ of afterCompileProcess(out, result, option)) {
      //
    }
  }
  console.log("end");
};

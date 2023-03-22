import { IBeforeConfig, beforeLog } from "./before";
import { ICompileConfig, compileLog } from "./compile";
import { IAfterConfig, afterLog } from "./after";
import { Pluggable } from "unified";
import remarkHeadings from "@vcarl/remark-headings";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter, { Traveler } from "@allen/remark-mdx-frontmatter";
import { Log, Report } from "./utils/log";
import { pathLog } from "./utils/path-extra";

const DefaultRemarkPlugins: ICompileConfig["remarkPlugins"] = [
  remarkPresetLintConsistent,
  remarkHeadings,
  remarkFrontmatter,
  [
    remarkMdxFrontmatter,
    {
      name: "frontmatter",
      action: ((name, data) => {
        return ["vfile-data", data];
      }) as Traveler,
    },
  ],
];

export class Option implements IBeforeConfig, IAfterConfig, ICompileConfig {
  remarkPlugins: ICompileConfig["remarkPlugins"];
  rehypePlugins: ICompileConfig["rehypePlugins"];
  recmaPlugins: ICompileConfig["recmaPlugins"];

  private _ignoringPath: string;
  private _mdAbsPath: string = "";
  private _cache: boolean = true;
  private _fileWriter: IAfterConfig["writer"];
  private _log: Log;

  constructor(fileWriter: IAfterConfig["writer"]) {
    this._log = new Log();
    this.remarkPlugins = DefaultRemarkPlugins;
    this.rehypePlugins = [];
    this.recmaPlugins = [];
    this._ignoringPath = "";
    this._fileWriter = fileWriter;
  }

  printInfo() {
    console.log("before:", beforeLog.getMassages());
    console.log("compile:", compileLog.getMassages());
    console.log("path:", pathLog.getMassages());
    console.log("after:", afterLog.getMassages());
    console.log("context:", this._log.getMassages());
  }

  addPlugin(For: "remark" | "rehype" | "recma", plugin: Pluggable) {
    switch (For) {
      case "rehype":
        this.rehypePlugins.push(plugin);
        break;
      case "remark":
        this.remarkPlugins.push(plugin);
        break;
      case "recma":
        this.recmaPlugins.push(plugin);
        break;
      default:
        this._log.fail("type", For, "not supported");
    }
  }

  get writer() {
    return this._fileWriter;
  }

  set mdAbsPath(path: string) {
    this._mdAbsPath = path;
  }
  get mdAbsPath() {
    return this._mdAbsPath;
  }

  get defaultPlugins() {
    return [DefaultRemarkPlugins, [], []];
  }

  setIgnorePathPatten(patten: string) {
    this._ignoringPath = patten;
  }
  get ignore() {
    return this._ignoringPath;
  }

  enableCache() {
    this._cache = true;
  }
  disableCache() {
    this._cache = false;
  }
  get hasCache() {
    return !!this._cache;
  }
}

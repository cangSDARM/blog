import { IBeforeConfig } from "./before";
import { ICompileConfig } from "./compile";
import { IAfterConfig } from "./after";
import { Pluggable } from "unified";
import remarkHeadings from "@vcarl/remark-headings";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter, { Traveler } from "@allen/remark-mdx-frontmatter";

class Report {
  error(...args: any[]) {
    console.error(...args);
  }
}

export class Option implements IBeforeConfig, IAfterConfig, ICompileConfig {
  type: "vanilla" | "nextjs" | "custom" = "vanilla";
  remarkPlugins: ICompileConfig["remarkPlugins"];
  rehypePlugins: ICompileConfig["rehypePlugins"];
  recmaPlugins: ICompileConfig["recmaPlugins"];

  private _ignoringPath: string;
  private _mdAbsPath: string = "";
  private cache: boolean = true;
  private reporter = new Report();
  private fileWriter: IAfterConfig["plugin"];

  constructor(fileWriter: IAfterConfig["plugin"]) {
    this.remarkPlugins = [
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
    this.rehypePlugins = [];
    this.recmaPlugins = [];
    this._ignoringPath = "";
    this.fileWriter = fileWriter;
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
        this.reporter.error("type", For, "not supported");
    }
  }

  get plugin() {
    return this.fileWriter;
  }

  set mdAbsPath(path: string) {
    this._mdAbsPath = path;
  }
  get mdAbsPath() {
    return this._mdAbsPath;
  }

  get defaultPlugins() {
    return [this.remarkPlugins, this.rehypePlugins];
  }

  setIgnorePathPatten(patten: string) {
    this._ignoringPath = patten;
  }
  get ignore() {
    return this._ignoringPath;
  }

  enableCache() {
    this.cache = true;
  }
  disableCache() {
    this.cache = false;
  }
  get hasCache() {
    return !!this.cache;
  }
}

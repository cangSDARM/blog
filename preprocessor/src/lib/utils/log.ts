import assert from "assert";
import { format as prettyFormat } from "pretty-format";

// TODO
export class Report {
  report() {}
}

function toString(obj: any): string {
  return prettyFormat(obj);
}

export class Log {
  private massages: { level: "log" | "fail" | "warn"; msg: string }[];

  constructor() {
    this.massages = [];
  }

  assertOk(value: unknown) {
    try {
      assert.ok(value);
    } catch (e) {
      this.fail("value is not ok", e);
      throw e;
    }
  }

  getMassages() {
    const res = this.massages.map((item) => item.level + ": " + item.msg);
    this.massages = [];

    return res;
  }

  log(...args: any[]) {
    this.massages.push({ level: "log", msg: args.map(toString).join() });
  }
  fail(...args: any[]) {
    this.massages.push({ level: "fail", msg: args.map(toString).join() });
  }
  warn(...args: any[]) {
    this.massages.push({ level: "warn", msg: args.map(toString).join() });
  }
}

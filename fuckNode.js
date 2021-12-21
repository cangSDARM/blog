// https://github.com/gatsbyjs/gatsby/discussions/31599#discussioncomment-1754627
// esm to node require
const esm = require("esm");
const fs = require("fs");
const Module = require("module");

// Node: bypass [ERR_REQUIRE_ESM]
const orig = Module._extensions[".js"];
Module._extensions[".js"] = function (module, filename) {
  try {
    return orig(module, filename);
  } catch (e) {
    // if (e.code === 'ERR_REQUIRE_ESM') { <-- I comment this because in my system this error is not throw.
    const content = fs.readFileSync(filename, "utf8");
    module._compile(content, filename);
    // }
  }
};

const _esmRequire = esm(module, {
  cjs: true,
  mode: "all",
});

// don't pollute Module
Module._extensions[".js"] = orig;

module.exports = function esmRequire(id) {
  return _esmRequire(id);
};

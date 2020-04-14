//FIXME: If you want use this in your project, please inject this into `gatsby-remark-prismjs`
// and replace highlight-code.js to this file

"use strict";

const Prism = require(`prismjs`);

const loadPrismLanguage = require(`./load-prism-language`);

const handleDirectives = require(`./directives`);

const escapeHTML = require(`./escape-html`);

const unsupportedLanguages = new Set();

function codeBlock(splited, useLine) {
  if (useLine) {
    return '<span class="code-line">' + splited + "</span>";
  } else {
    return splited;
  }
}

module.exports = (
  language,
  code,
  additionalEscapeCharacters = {},
  lineNumbersHighlight = [],
  noInlineHighlight = false
) => {
  // (Try to) load languages on demand.
  if (!Prism.languages[language]) {
    try {
      loadPrismLanguage(language);
    } catch (e) {
      // Language wasn't loaded so let's bail.
      let message = null;

      switch (language) {
        case `none`:
          return code;
        // Don't escape if set to none.

        case `text`:
          message = noInlineHighlight
            ? `code block language not specified in markdown.`
            : `code block or inline code language not specified in markdown.`;
          break;

        default:
          message = `unable to find prism language '${language}' for highlighting.`;
      }

      const lang = language.toLowerCase();

      if (!unsupportedLanguages.has(lang)) {
        console.warn(message, `applying generic code block`);
        unsupportedLanguages.add(lang);
      }

      return escapeHTML(code, additionalEscapeCharacters);
    }
  }

  const grammar = Prism.languages[language];
  const highlighted = Prism.highlight(code, grammar, language);
  const codeSplits = handleDirectives(highlighted, lineNumbersHighlight);
  let finalCode = ``;
  const lastIdx = codeSplits.length - 1; // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.

  codeSplits.forEach((split, idx) => {
    // where been changed
    const splited = split.highlight
      ? split.code
      : `${split.code}${idx == lastIdx ? `` : `\n`}`;
    finalCode += codeBlock(splited, true);
  });
  return finalCode;
};

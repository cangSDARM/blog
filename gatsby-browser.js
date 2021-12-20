/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require("./configs/prismjs-theme.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

const { getCLS, getFCP, getFID, getLCP, getTTFB } = require("web-vitals");

getCLS(console.info);
getFCP(console.info);
getFID(console.info);
getLCP(console.info);
getTTFB(console.info);
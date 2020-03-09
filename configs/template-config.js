const path = require("path");
const fs = require("fs");
const _ = require("loadsh");

/**
 * Set this if you want cat this specifical file of any templates in URL.
 */
const indexPage = "/index";

const exts = ["md", "mdx"];
/**
 * The ignore configs.
 *  i.e: if you want ignore tags&default template:
 *  let ignore = /^(tags|default)/gi
 */
let ignore = /^(tags)/gi;
/**
 * match first dir
 */
const slugDir = /^\/(\S*?)(\/|$)/;
/**
 * The template global configs.
 * This config has the highest priority
 */
let templateConfig = {
  default: {
    slug: "",
    template: "src/templates/default.js",
  },
};

/**
 * Ignore if global config sets
 * @param {String} el template file name
 * @returns {Boolean} true if passed
 */
function passSets(el) {
  // console.log(el, pass);
  return templateConfig[el] ? true : false;
}

(function() {
  const templates = path.resolve("src/templates");
  const paths = path.resolve("src/pages");

  fs.readdir(templates, (err, files) => {
    err && console.error("fs error", err);
    // console.log(files);
    files.forEach(ele => {
      if (!ele.match(ignore)) {
        const el = ele.replace(/\.\S*/g, "");
        const newPath = path.join(paths, el);

        //没配置
        !passSets(el) &&
          fs.mkdir(newPath, e => {
            e && console.warn("exisit config", e);
            templateConfig[el] = {
              slug: `/${el}`,
              template: `src/templates/${ele}`,
            };
            // console.log(templateConfig);
          });
      }
    });
  });
})();

/**
 * For gen templates node in graphql
 */
exports.templateNodeInject = function({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  let i, node;
  for (let key in templateConfig) {
    i = templateConfig[key];
    node = {
      name: key,
      location: i.slug,
      template: i.template,
      id: createNodeId(`templateMap-${key}`),
      internal: {
        type: "templates",
        contentDigest: createContentDigest(i),
      },
    };
    createNode(node);
  }
};

/**
 * Create all field that will needed
 * @param {Function} createNodeField function to create
 * @param {Object} node gatsby node
 * @param {Object} config the need gen fields data
 */
function createNodeFields(createNodeField, node, config) {
  // console.log("config", config);
  createNodeField({
    node,
    name: "templateTag",
    value: config.templateTag,
  });
  createNodeField({
    node,
    name: `slug`,
    value: config.slug,
  });
}

/**
 * Find be allowed file name
 * @param {String} name the file name
 * @param {String} ext the file extention
 */
function markName(name, ext) {
  let trust = false;
  exts.forEach(i => {
    if (!trust && ext.endsWith(i)) trust = true;
  });
  if (!trust) {
    throw new Error(
      `${name}${ext} is not markdown file, but it also run in inject program. PLEASE FIND ANY BUGS!!`
    );
  }
  return name;
}

/**
 * parse gatsby's auto gen absPath
 * @param {String} absPath the gatsby's style absolutePath
 * @returns {String} the name of markdown file
 */
function parseAbsPath(absPath) {
  let { name, ext } = path.parse(absPath);
  // {
  //   root: 'C:/',
  //   dir: 'C:/Users/itc190106/Desktop/GaphicsLearnning/cangSDARM.github.io/src/pages/slug-graphics',
  //   base: 'index.md',
  //   ext: '.md',
  //   name: 'index'
  // }
  return markName(name, ext);
}

/**
 * Inject template to field processing
 * @param {String} slug orginal slug
 * @param {Object} node the node object
 * @param {Function} createNodeField use this to inject
 */
exports.templateFieldInject = function(_slug, node, createNodeField) {
  const name = parseAbsPath(node.fileAbsolutePath);
  let breakFlag = false;
  let createConfig = {
    templateTag: 0,
    slug: `${_slug}`,
  };
  // console.log("nodeInject", _slug, node.fileAbsolutePath, indexPage, name);
  const slug = slugDir.exec(_slug)[1];
  if (!templateConfig[slug]) throw new Error(reg, "isn't exec for", _slug);
  else {
    //slug:/graphics, i.tag: graphics
    createConfig.templateTag = slug;
    createNodeFields(createNodeField, node, createConfig);
    breakFlag = true;
  }

  //default slug
  if (!breakFlag) {
    createNodeFields(createNodeField, node, createConfig);
  }
};

let pagesContext = {};

/**
 * Create page. due to: [Issues](https://github.com/gatsbyjs/gatsby/issues/19689)
 */
exports.templateComponentInject = function({ page, createPage, deletePage }) {
  const pagePath = page.path;
  const slug = slugDir.exec(pagePath)[1];
  // console.log(pagePath, slug);
  if (templateConfig[slug]) {
    // console.log("detect: ", templateConfig[slug]);
    deletePage(page);
    createPage({
      ...page,
      component: path.resolve(
        // `./src/templates/default.js`
        `./${templateConfig[slug].template}`
      ),
      context: {
        ...page.context,
        ...pagesContext[pagePath],
      },
    });
  }
};

/**
 * Inject Context for prepare to create a page
 * @param {Object} edges gatsby gen automatic
 * @param {Function} createPage use this to create each page
 */
exports.templateContextInject = function(edges) {
  let pagePath = "";
  edges.forEach(({ node }) => {
    // make sure it's ended by `/`
    pagePath = _.trimEnd(node.fields.slug, "/");
    pagePath = pagePath + "/";

    pagesContext[pagePath] = {
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      slug: node.fields.slug,
      genByTemplate: node.fields.templateTag,
    };
  });
};

///FIXME: gatsby Warning: This could lead to non-deterministic routing behavior. It makes pages not work properly
// exports.templateContextInject = function(edges) {
//   let pagePath = "";
//   edges.forEach(({ node }) => {
//     // make sure it's ended by `/`. (for against gatsby `Create pages repeatedly` bug...)
//     pagePath = _.trimEnd(node.fields.slug, "/");
//     pagePath = pagePath + "/";

//     //cat /index
//     if (pagePath.endsWith("index"))
//       pagePath = pagePath.substring(0, pagePath.lastIndexOf(indexPage));

//     // console.log("create", pagePath);
//     createPage({
//       path: pagePath,
//       component: path.resolve(
//         // `./src/templates/default.js`
//         `./${templateConfig[node.fields.templateTag].template}`
//       ),
//       context: {
//         title: node.frontmatter.title,
//         date: node.frontmatter.date,
//         slug: node.fields.slug,
//         genByTemplate: node.fields.templateTag,
//       },
//     });
//   });
// };

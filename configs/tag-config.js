const path = require("path");
const { kebabCase } = require("lodash");

const tagTemplate = path.resolve("src/templates/tags.js"); //resolve从项目目录开始的……有点奇怪

exports.tagComponentInject = function (tags, createPage) {
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

const path = require("path");
const { kebabCase } = require("lodash");

const tagTemplate = path.resolve("src/templates/tags.tsx");

exports.tagComponentInject = function (tags, createPage) {
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

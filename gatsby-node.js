/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const {
  templateContextInject,
  templateComponentInject,
  templateFieldInject,
  templateNodeInject,
} = require("./configs/template-config");
const { tagComponentInject } = require("./configs/tag-config");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
      trailingSlash: false,
    });
    templateFieldInject(slug, node, createNodeField);
  }
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  templateNodeInject({ createNode, createNodeId, createContentDigest });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  templateComponentInject({ page, createPage, deletePage });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      postsRemark: allMdx(
        sort: { order: ASC, fields: [frontmatter___date, fileAbsolutePath] }
      ) {
        edges {
          node {
            fields {
              slug
              templateTag
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  if (result.errors) {
    console.error(result.errors);
  }

  templateContextInject(result.data.postsRemark.edges);
  tagComponentInject(result.data.tagsGroup.group, createPage);
};

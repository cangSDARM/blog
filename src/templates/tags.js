import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout
      main={{
        style: {
          flexDirection: `column`,
        },
      }}
    >
      <h1>{tagHeader}</h1>
      <div>
        <ul
          style={{
            listStyle: `none`,
          }}
        >
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            let depth = slug.match(/\//g) || [];
            depth.shift();
            depth.shift();
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                {depth.map((_, i) => {
                  return (
                    <span
                      key={`_${i}`}
                      style={{ width: `1em`, display: `inline-block` }}
                    ></span>
                  );
                })}
                <Link to={`${slug}/`}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Link to="/tags">All tags</Link>
    </Layout>
  );
};

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date, fileAbsolutePath], order: ASC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

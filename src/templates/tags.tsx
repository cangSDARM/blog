import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Tags: React.FC<{pageContext: any, data: any}> = ({ pageContext, data }) => {
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
          {edges.map(({ node }: any) => {
            const { slug = '' } = node.fields;
            const depth = (slug as string).match(/\//g) || [];
            depth.shift();
            depth.shift();
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                {depth.map((_:any, i) => {
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
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: {
        fields: [frontmatter___index, frontmatter___date, fileAbsolutePath]
        order: ASC
      }
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

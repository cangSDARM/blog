import { graphql, Link } from "gatsby";
import _ from "lodash";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import * as classes from "./style.module.css";

const Tags: React.FC<{ pageContext: any; data: any }> = ({
  pageContext,
  data,
}) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  const memoList = React.useMemo(
    () =>
      edges.map(({ node }: any) => {
        const { slug = "" } = node.fields;
        const depth = (slug as string).match(/\//g) || [];
        depth.shift();
        depth.shift();
        const { title } = node.frontmatter;
        return (
          <li key={slug} className={classes.tagsListItem}>
            {depth.map((_: any, i) => {
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
      }),
    [edges]
  );

  return (
    <Layout
      main={{
        style: {
          flexDirection: `column`,
        },
      }}
    >
      <SEO
        title={_.startCase(tag)}
        config={{
          titleTemplate: `%s | Tags`,
        }}
      />
      <h1>{tagHeader}</h1>
      <ul
        style={{
          listStyle: `none`,
        }}
      >
        {memoList}
      </ul>
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

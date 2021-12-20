import { makeStyles } from "@mui/styles";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const useTheme = makeStyles((_) => ({
  listItem: {
    margin: "0.2em 0",
    padding: "0.4em 1em",
    borderRadius: 4,

    "&>a": {
      color: "rgb(17,24,39)",
    },

    "&:hover": {
      "&>a": {
        color: "rgb(55,65,81)",
      },
      backgroundColor: "#e8eaee",
    },
  },
}));

const Tags: React.FC<{ pageContext: any; data: any }> = ({
  pageContext,
  data,
}) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  const classes = useTheme();

  const memoList = React.useMemo(
    () =>
      edges.map(({ node }: any) => {
        const { slug = "" } = node.fields;
        const depth = (slug as string).match(/\//g) || [];
        depth.shift();
        depth.shift();
        const { title } = node.frontmatter;
        return (
          <li key={slug} className={classes.listItem}>
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

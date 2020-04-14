import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TagsList from "../components/tag-lists";
import Indexing from "../components/indexing";
import styles from "../components/graphics/main.module.css";
import { TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  Tab,
  Naviagtion,
  Anchor,
  Quote,
  Model,
  Expansion,
  Aphorism,
  CommentList,
  ModelList,
  Table,
} from "../components/graphics/mdx";

const shotCodes = {
  Tab,
  Naviagtion,
  Anchor,
  Quote,
  Model,
  Expansion,
  Aphorism,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  hr: props => <hr className={styles.hrStyle} {...props} />,
  a: props => <a className={styles.aStyle} {...props}></a>,
  th: props => <th className={styles.thStyle} {...props}></th>,
  td: props => <th className={styles.tdStyle} {...props}></th>,
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function Template({ data }) {
  const { mdx, allMdx } = data;
  const { frontmatter, body, fields, exports } = mdx;
  CommentList(exports.QuoteList);
  ModelList(exports.ImgList);
  let title =
    fields.slug === `/${fields.templateTag}`
      ? "GraphicsLearnning"
      : frontmatter.title;
  return (
    <Layout
      content={{
        className: `${styles.mainStyle}`,
      }}
      footer={{
        className: "default-footer",
        style: {
          filter: `invert(1) drop-shadow(2px 4px 6px black)`,
        },
      }}
    >
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}`
              ? `%s`
              : `%s | GraphicsLearnning`,
        }}
      ></SEO>
      <ThemeProvider theme={theme}>
        <div className={styles.graphicsPost}>
          <h1>
            <a
              href="#"
              title={`${frontmatter.date}`}
              className={styles.titleStyle}
            >
              {frontmatter.title}
            </a>
          </h1>
          <Indexing
            slug={fields.slug}
            data={allMdx?.edges}
            className={styles.indexingStyle}
          />
          <TagsList tags={frontmatter.tags} className={styles.taglistsStyle} />
          <MDXProvider components={shotCodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <div id="Comment" className={styles.Comment}></div>
        </div>
      </ThemeProvider>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        tags
      }
      fields {
        slug
        templateTag
      }
      exports {
        QuoteList
        ImgList
      }
    }

    allMdx(
      sort: { fields: [frontmatter___index, fileAbsolutePath], order: ASC }
      filter: { frontmatter: { tags: { in: ["graphics"] } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            index
          }
        }
      }
    }
  }
`;

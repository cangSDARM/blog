import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Paper } from "@material-ui/core";
import styles from "../components/archive/main.module.css";
import { useType } from "../components/archive/useType";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Resources from "../components/archive/resources";

const archivedMdx = {
  Paper,
};

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields, headings } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? "ArchivedArticle"
      : frontmatter.title;
  const className = useType(frontmatter.type);
  return (
    <Layout>
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}`
              ? `%s`
              : `%s | ArchivedArticle`,
        }}
      ></SEO>
      <div className={className}>
        <h1>{frontmatter.title}</h1>
        <Resources
          avatar={frontmatter?.avatar}
          reference={frontmatter?.reference || undefined}
          headings={headings}
        />
        <article>
          <MDXProvider components={archivedMdx}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </article>
      </div>
      <div className="empty"></div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        type
        avatar
        reference
      }
      fields {
        slug
        templateTag
      }
      headings(depth: h2) {
        value
        depth
      }
    }
  }
`;

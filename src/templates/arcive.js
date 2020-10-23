import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Paper } from "@material-ui/core";
import styles from "../components/arcive/main.module.css";
import { useType } from "../components/arcive/useType";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Resources from "../components/arcive/resources";

const arcivedMdx = {
  Paper,
};

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields, headings } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? "ArcivedArticle"
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
              : `%s | ArcivedArticle`,
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
          <MDXProvider components={arcivedMdx}>
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

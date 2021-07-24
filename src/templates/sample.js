import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer, MDXProvider } from "gatsby-plugin-mdx";
import CodeBlock from "../components/code-block";

const shortCodes = {
  CodeBlock,
};

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}` ? `Sample` : frontmatter.title;
  return (
    <Layout>
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}` ? `%s` : `%s | Sample`,
        }}
      ></SEO>
      <div className="samples">
        <h1>{frontmatter.title}</h1>
        <MDXProvider components={shortCodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
      fields {
        slug
        templateTag
      }
    }
  }
`;

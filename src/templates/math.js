import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "katex/dist/katex.min.css";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
// import {TagsList} from '../components/TagsList'

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? `MathLearning`
      : frontmatter.title;
  return (
    <Layout>
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}`
              ? `%s`
              : `%s | MathLearnning`,
        }}
      />
      <div className="math-post">
        <h1>{frontmatter.title}</h1>
        {/* <TagsList tags={post.frontmatter.tags} /> */}
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date
        title
      }
      fields {
        slug
        templateTag
      }
    }
  }
`;

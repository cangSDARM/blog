import TeX from "@matejmazur/react-katex";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "katex/dist/katex.min.css";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
// import {TagsList} from '../components/TagsList'

const components = {
  div: (props) => {
    if (props.className?.includes("math-display")) {
      import("katex/dist/katex.min.css");
      return <TeX block math={props.children} />;
    }
    return <div {...props} />;
  },
  span: (props) => {
    if (props.className?.includes("math-inline")) {
      import("katex/dist/katex.min.css");
      return <TeX math={props.children} />;
    }
    return <span {...props} />;
  },
};

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? `MathLearnning`
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
      ></SEO>
      <div className="math-post">
        <h1>{frontmatter.title}</h1>
        {/* <small>{frontmatter.date}</small> */}
        {/* <TagsList tags={post.frontmatter.tags} /> */}
        <MDXRenderer components={components}>{body}</MDXRenderer>
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

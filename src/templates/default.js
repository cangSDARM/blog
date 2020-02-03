import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Template({ data }) {
  // const { mdx } = data;
  // const { frontmatter, body } = mdx;
  return (
    <Layout>
      <SEO title="GraphicsLearnning"></SEO>
      <div className="graphics-post">
        {/* <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <MDXRenderer>{body}</MDXRenderer> */}
      </div>
    </Layout>
  );
}

// export const query = graphql`
//   query($slug: String!) {
//     mdx(fields: { slug: { eq: $slug } }) {
//       body
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//       }
//     }
//   }
// `;

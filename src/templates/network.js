import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Indexing from "../components/indexing";
import Layout from "../components/layout";
import * as styles from "../components/network/style.module.css";
import SEO from "../components/seo";
import TagsList from "../components/tag-lists";

const shotCodes = {
  h3: (props) => <h3 style={{ margin: `20px 0 10px` }} {...props} />,
  // p: props => <p className={styles.cp} {...props} />,
  blockquote: (props) => (
    <blockquote className={styles.cblockquote} {...props} />
  ),
};

export default function Template({ data }) {
  const { mdx, headerIamge, allMdx } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? `Network-Top2Down`
      : frontmatter.title;
  return (
    <Layout
      header={{
        style: {
          backgroundImage: `url(${getSrc(headerIamge.childImageSharp)})`,
          backgroundSize: `cover`,
        },
      }}
    >
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}`
              ? `%s`
              : `%s | Network-Top2Down`,
        }}
      ></SEO>
      <div
        className={styles.netPost}
        style={{
          maxWidth: `960px`,
          fontFamily: `YaHei, Helvetica, arial, sans-serif`,
          fontSize: `16px`,
        }}
      >
        <h1>{frontmatter.title}</h1>
        <Indexing slug={fields.slug} data={allMdx?.edges} />
        <TagsList tags={frontmatter.tags} />
        {/* <TagsList tags={post.frontmatter.tags} /> */}
        <MDXProvider components={shotCodes}>
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
        tags
        title
      }
      fields {
        slug
        templateTag
      }
    }

    allMdx(
      sort: { fields: [frontmatter___index, fileAbsolutePath], order: ASC }
      filter: { frontmatter: { tags: { in: ["network"] } } }
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

    headerIamge: file(relativePath: { eq: "network-logo.png" }) {
      childImageSharp {
        gatsbyImageData(formats: [AUTO, WEBP], quality: 100)
      }
    }
  }
`;

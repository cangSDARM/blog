import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import styles from "../components/network/style.module.css";

const shotCodes = {
  h3: props => <h3 style={{ margin: `20px 0 10px` }} {...props} />,
  h2: props => <h2 className={styles.ch2} {...props} />,
  // p: props => <p className={styles.cp} {...props} />,
  blockquote: props => <blockquote className={styles.cblockquote} {...props} />,
};

export default function Template({ data }) {
  const resizeWeight = 0.5625;
  const { mdx, headerIamge } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? `Network-Top2Down`
      : frontmatter.title;
  return (
    <Layout
      header={{
        //FIXME: header的图像表示有问题。参看haskell的header处理
        style: {
          backgroundImage: `url(${headerIamge.childImageSharp.fluid.src})`,
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
        className="net-post"
        style={{
          maxWidth: `960px`,
          fontFamily: `YaHei, Helvetica, arial, sans-serif`,
          fontSize: `16px`,
        }}
      >
        <h1>{frontmatter.title}</h1>
        {/* <small>{frontmatter.date}</small> */}
        {/* <TagsList tags={post.frontmatter.tags} /> */}
        <MDXProvider components={shotCodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
      <Nav tag={fields.templateTag} slug={fields.slug} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
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

    headerIamge: file(relativePath: { eq: "network-logo.png" }) {
      childImageSharp {
        fluid(fit: COVER, pngQuality: 100) {
          src
          presentationHeight
          presentationWidth
          originalName
        }
      }
    }
  }
`;

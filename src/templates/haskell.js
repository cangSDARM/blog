import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TagsList from "../components/tag-lists";

function HaskellHeader(fluid) {
  const resizeWeight = 0.5625;
  return (
    <Link to="/tags/haskell">
      <div
        style={{
          display: `inline-flex`,
          color: `#fff`,
          marginLeft: `5rem`,
          flexDirection: `column`,
        }}
      >
        <img
          alt={fluid.originalName.replace(".png", "")}
          src={fluid.src}
          style={{
            fontSize: `45px`,
            width: `${fluid.presentationWidth * resizeWeight}px`,
            height: `${fluid.presentationHeight * resizeWeight}px`,
            filter: `hue-rotate(180deg) invert(1)`,
          }}
        />
        <h6>An advanced, purely functional programming language</h6>
      </div>
    </Link>
  );
}

export default function Template({ data }) {
  const { mdx, headerIamge, logoIamge } = data;
  const { frontmatter, body, fields } = mdx;
  let title =
    fields.slug === `/${fields.templateTag}`
      ? `LearnYouAHaskell`
      : frontmatter.title;
  return (
    <Layout
      header={{
        style: {
          backgroundImage: `url(${headerIamge.childImageSharp.fluid.src})`,
          backgroundSize: `cover`,
        },
        children: HaskellHeader(logoIamge.childImageSharp.fluid),
      }}
    >
      <SEO
        title={title}
        config={{
          titleTemplate:
            fields.slug === `/${fields.templateTag}`
              ? `%s`
              : `%s | LearnYouAHaskell`,
        }}
      ></SEO>
      <div className="haskell-post">
        <h1>{frontmatter.title}</h1>
        {/* <h2>{frontmatter.date}</h2> */}
        <TagsList tags={frontmatter.tags} />
        <MDXRenderer>{body}</MDXRenderer>
      </div>
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
        tags
      }
      fields {
        slug
        templateTag
      }
    }

    headerIamge: file(relativePath: { eq: "haskell-header.png" }) {
      childImageSharp {
        fluid(fit: COVER, pngQuality: 100) {
          src
        }
      }
    }

    logoIamge: file(relativePath: { eq: "haskell-logo.png" }) {
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

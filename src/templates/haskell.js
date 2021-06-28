import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import TagsList from "../components/tag-lists";

function HaskellHeader(fluid) {
  const image = getImage(fluid);

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
        <GatsbyImage
          alt={""}
          image={image}
          style={{
            fontSize: `45px`,
            // width: `${fluid.presentationWidth * resizeWeight}px`,
            // height: `${fluid.presentationHeight * resizeWeight}px`,
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
          backgroundImage: `url(${getSrc(headerIamge.childImageSharp)})`,
          backgroundSize: `cover`,
        },
        children: HaskellHeader(logoIamge.childImageSharp),
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
  query ($slug: String!) {
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
        gatsbyImageData(formats: [AUTO, WEBP], quality: 100)
      }
    }

    logoIamge: file(relativePath: { eq: "haskell-logo.png" }) {
      childImageSharp {
        gatsbyImageData(formats: [AUTO, WEBP], quality: 100, height: 56)
      }
    }
  }
`;

import { MDXProvider } from "@mdx-js/react";
import { Paper } from "@mui/material";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import _ from "lodash";
import React from "react";
import Resources from "../components/archive/resources";
import { useType } from "../components/archive/useType";
import Layout from "../components/layout";
import SEO from "../components/seo";

const archivedMdx = {
  Paper,
};

function deepFlatten(toc = {}) {
  return _.flatten(
    toc?.items?.map((i) => {
      const lgtm = [];
      lgtm.push(_.omit(i, ["items"]));

      if (i.items) lgtm.push(...deepFlatten(i));

      return lgtm;
    })
  );
}

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, fields, tableOfContents, headings } = mdx;
  const title =
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
          toc={{
            items: _.pullAllBy(
              deepFlatten(tableOfContents),
              headings.map((i) => ({ title: i.value })),
              "title"
            ),
          }}
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
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        type
        avatar
        reference
      }
      tableOfContents(maxDepth: 2)
      headings(depth: h1) {
        value
      }
      fields {
        slug
        templateTag
      }
    }
  }
`;

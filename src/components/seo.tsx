/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO: React.FC<
  React.PropsWithChildren<{
    description?: string;
    lang?: string;
    meta?: { property?: string; name?: string; content: string }[];
    title: string;
    config?: { titleTemplate: string };
  }>
> = ({
  description = "",
  lang = "cn",
  meta = [],
  title,
  config = { titleTemplate: "" },
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  let titleTemplate = config.titleTemplate
    ? config.titleTemplate
    : `%s | ${site.siteMetadata.title}`;

  return (
    <Helmet titleTemplate={titleTemplate}>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map((m) => (
        <meta
          name={m.name}
          content={m.content}
          property={m.property}
          key={m.name}
        />
      ))}
      {children}
    </Helmet>
  );
};

export default SEO;

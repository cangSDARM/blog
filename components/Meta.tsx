import Head from "next/head";
import Conf from "@/conf";
import React from "react";

const Meta: React.FC<{
  title?: string;
  titleTemplate?: string;
  meta?: { property?: string; name?: string; content: string }[];
}> = ({ title = "", titleTemplate = "%s", meta = [] }) => {
  const ogTitle = titleTemplate.replace("%s", title || Conf.site.title);

  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{ogTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta key="og:title" property="og:title" content={ogTitle} />
      <meta
        key="meta:description"
        name="description"
        content={Conf.site.description}
      />
      <meta
        key="og:description"
        property="og:description"
        content={Conf.site.description}
      />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      {meta.map((m) => (
        <meta
          name={m.name}
          content={m.content}
          property={m.property}
          key={m.name}
        />
      ))}
    </Head>
  );
};

export default Meta;

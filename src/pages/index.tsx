import { graphql } from "gatsby";
import React, { FC } from "react";
import Image from "../components/image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import puns from "../raw/pun";

const lists: Record<string, string[]> = {
  TODO: [],
  PROCESSING: [],
};

const IndexPage: FC<{ data: any }> = ({ data }) => (
  <Layout>
    <SEO
      title={data.site.siteMetadata.title}
      config={{ titleTemplate: `%s` }}
    />
    <div style={{ margin: `0 auto`, width: `980px` }}>
      <div
        style={{ margin: `0 auto`, maxWidth: `300px`, marginBottom: `1.45rem` }}
      >
        <Image path="doctor-strange-logo" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.keys(lists).map((key) => {
          return (
            lists[key].length > 0 && (
              <span
                style={{
                  color: `rgba(0,0,0,.75)`,
                  fontWeight: 700,
                  margin: `1rem 0`,
                }}
                key={key}
              >
                {`${key.toUpperCase()} List:`}
              </span>
            )
          );
        })}
      </div>
      <div
        style={{
          margin: "1em .5em 0 0",
          padding: ".5em",
          paddingLeft: "1em",
          backgroundColor: "#f1f1f1",
        }}
      >
        {puns.map((pun) => {
          const key = pun.toString().substring(0, 15);
          return (
            <blockquote
              style={{
                color: "rgba(0,0,0,.5)",
                margin: "4px 0",
              }}
              key={key}
            >
              {pun}
            </blockquote>
          );
        })}
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;

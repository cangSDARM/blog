import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title={data.site.siteMetadata.title}
      config={{ titleTemplate: `%s` }}
    />
    <div style={{ margin: `0 auto`, width: `980px` }}>
      <h1>Hi people</h1>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image image="gatsby-astronaut.png" />
      </div>
      <span style={{ color: `#c3fa00`, background: `#3700fa` }}>
        {"TODO".toUpperCase()}-List:{" "}
      </span>
      <div style={{ margin: `1rem 0 1rem 2rem` }}></div>
      <span style={{ color: `#ff4c2c`, background: `#33fa1a` }}>
        {"processing".toUpperCase()}-List:{" "}
      </span>
      <div style={{ margin: `1rem 0 1rem 2rem` }}></div>
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

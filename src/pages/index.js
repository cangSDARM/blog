import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Nav from "../components/nav";

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
        TODO-List:{" "}
      </span>
      <div style={{ margin: `1rem 0 1rem 2rem` }}>
        <a href="https://ssshooter.com/2018-12-10-gatsby-blog-2/">
          TODO: 使用 Gatsby.js 搭建静态博客-2 实现分页
        </a>
        <br />
        <a href="https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-grid-tables#readme">
          TODO: 使用remark-table，重写以前的那堆table
        </a>
      </div>
      <Nav>
        {data.allTemplates.nodes.map(i => {
          if (i.name === "default") return null;
          return (
            <Link key={i.name} to={i.location}>
              {i.name}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
          );
        })}
        <Link to="/tags">Go to find Tags</Link>
      </Nav>
    </div>
  </Layout>
);

export const query = graphql`
  {
    allTemplates {
      nodes {
        name
        location
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;

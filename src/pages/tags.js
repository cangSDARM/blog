import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

import { tagToPath } from "../utils/paths";

export default ({ data }) => {
  const { group } = data.tagsGroup;

  return (
    <Layout>
      <SEO title="tags"></SEO>
      <Nav>
        {group.map(i => {
          return (
            <li key={i.fieldValue.toString()}>
              <Link to={tagToPath(i.fieldValue)}>{i.fieldValue}</Link>
            </li>
          );
        })}
        <Link to="/">首页</Link>
      </Nav>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    tagsGroup: allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;

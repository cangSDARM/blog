import React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";

export const Nav = ({ tag, slug }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      tags: allMdx(sort: { fields: frontmatter___date }) {
        nodes {
          frontmatter {
            tags
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const pages = data.tags.nodes
    .filter(page => page.frontmatter.tags.includes(tag))
    .map(item => ({ title: item.frontmatter.title, slug: item.fields.slug }));

  return (
    <section
      id="nav-section"
      style={{
        padding: `16px`,
        alignSelf: `flex-start`,
        position: `fixed`,
        right: `10vw`,
      }}
    >
      <nav className="nav-map" style={{ listStyle: `none` }}>
        {pages.map(item => (
          <li
            key={item.title}
            style={
              slug === item.slug
                ? { textDecoration: "underline", color: "#3388ff" }
                : null
            }
          >
            <Link to={item.slug}>{item.title}</Link>
          </li>
        ))}
      </nav>
    </section>
  );
};

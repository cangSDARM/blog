/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import "./layout.css";
import "katex/dist/katex.min.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Layout = ({ children, ...otherProps }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const headerProps = otherProps && otherProps.header;
  const contentProps = otherProps && otherProps.content;
  const footerProps = otherProps && otherProps.footer;
  const mainProps = otherProps && otherProps.main;

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} {...headerProps} />
      <div
        style={{
          margin: `0 auto`,
          paddingTop: 0,
          height: `calc(100vh - 86px)`,
          overflowY: `auto`,
          overflowX: `hidden`,
        }}
        {...contentProps}
      >
        <ThemeProvider theme={theme}>
          <main {...mainProps}>{children}</main>
        </ThemeProvider>
        <Footer {...footerProps} />
      </div>
    </>
  );
};

Layout.defaultProps = {
  footer: {
    className: "default-footer",
  },
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.object,
  footer: PropTypes.object,
  main: PropTypes.object,
  content: PropTypes.object,
};

export default Layout;

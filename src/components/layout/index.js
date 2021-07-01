/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { graphql, useStaticQuery } from "gatsby";
import "katex/dist/katex.min.css";
import PropTypes from "prop-types";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import "./layout.css";

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
        id="scroll-spy"
        style={{
          margin: `0 auto`,
          paddingTop: 0,
          height: `calc(100vh - 86px)`,
          overflowY: `auto`,
          overflowX: `hidden`,
          scrollBehavior: "smooth",
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

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Drawer from "./Drawer";
import Footer from "./footer";
import Header from "./header";

const Layout: React.FC<
  React.PropsWithChildren<{
    header?: object;
    content?: object;
    footer?: object;
    main?: { style: {}; [k: string]: {} };
  }>
> = ({ children, ...otherProps }) => {
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
  const footerProps = (otherProps && otherProps.footer) || {
    className: "default-footer",
  };
  const { style: mainStyle = {}, ...mainProps } = (otherProps &&
    otherProps.main) || { style: {} };

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
          display: "flex",
          flexDirection: "column",
        }}
        {...contentProps}
      >
        <main {...mainProps} style={{ ...mainStyle, flexGrow: 1 }}>
          {children}
        </main>
        <Footer {...footerProps} />
      </div>
      <Drawer />
    </>
  );
};

export default Layout;

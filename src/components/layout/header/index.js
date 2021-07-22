import PropTypes from "prop-types";
import React from "react";
import AppBar from "./appbar";

const Header = ({ siteTitle, ...otherProps }) => {
  const { children, wrapper, ...props } = otherProps;

  return (
    <AppBar siteTitle={siteTitle} wrapper={wrapper} {...props}>
      {children}
    </AppBar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

const Header = ({ siteTitle, ...otherProps }) => {
  const { children, wrapper, ...props } = otherProps;
  return (
    <header {...props}>
      <div className={["default-wrapper", wrapper].join(" ")}>
        <h1 style={{ margin: 0 }}>
          <Link to="/" id="head">
            {siteTitle}
          </Link>
        </h1>
        {children}
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

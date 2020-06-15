import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, SvgIcon } from "./styled";
import Drawer from "./drawer";

const Header = ({ siteTitle, ...otherProps }) => {
  const { children, wrapper, ...props } = otherProps;
  const [opend, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <AppBar position="static" {...props}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <SvgIcon>
              <path
                fill="currentColor"
                d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z"
              />
            </SvgIcon>
          </IconButton>
          <Typography
            variant="h2"
            className={["default-wrapper", wrapper].join(" ")}
          >
            <Link to="/" id="head">
              {siteTitle}
            </Link>
            {children}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={opend} toggle={toggleDrawer} />
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

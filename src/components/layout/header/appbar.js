import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { Link } from "gatsby";
import PropType from "prop-types";
import React from "react";

const useAppBarStyle = makeStyles((theme) => ({
  root: {
    userSelect: "none",
    background: "rebeccapurple",
    borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
    overflow: "hidden" /*enable to BFC*/,
    justifyContent: "center",
    textDecoration: "none",
    fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    width: "100%",
    display: "flex",
    zIndex: 1100,
    boxSizing: "border-box",
    flexShrink: 0,
    flexDirection: "column",
    color: "#eee",
    height: 86 /* if want expanded to hidden Y scrollbar, need this*/,
  },
  toolbar: {
    height: "96%",
  },
  title: {
    fontFamily: "inherit",
    alignItems: "baseline",
  },
  icon: {
    minWidth: 48,
    maxWidth: 48,
    minHeight: 48,
    maxHeight: 48,
  },
}));

const AppBar = ({ wrapper, children, siteTitle, ...props }) => {
  const classes = useAppBarStyle();

  return (
    <header className={classes.root} {...props}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h2" className={clsx(classes.title, wrapper)}>
          <Link to="/" id="head">
            {siteTitle}
          </Link>
          {children}
        </Typography>
      </Toolbar>
    </header>
  );
};

AppBar.PropType = {
  wrapper: PropType.string,
  siteTitle: PropType.string,
};

export default AppBar;

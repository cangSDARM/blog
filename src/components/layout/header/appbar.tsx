import { Toolbar, Typography } from "@mui/material";
import clsx from "clsx";
import { Link } from "gatsby";
import React, { memo } from "react";
import * as classes from "./index.module.css";

const AppBar: React.FC<
  {
    wrapper?: string;
    siteTitle: string;
  } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ wrapper, children, siteTitle, ...props }) => {
  return (
    <header className={classes.header} {...props}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h3" className={clsx(classes.title, wrapper)}>
          <Link to="/" id="head">
            {siteTitle}
          </Link>
          {children}
        </Typography>
      </Toolbar>
    </header>
  );
};

export default memo(AppBar);

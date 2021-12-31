import { Typography } from "@mui/material";
import React from "react";
import * as classes from "./style.module.css";

const Label: React.FC<{}> = ({ children }) => {
  return (
    <Typography role="menuitem" component="div" className={classes.treeLabel}>
      {children}
    </Typography>
  );
};

export default Label;

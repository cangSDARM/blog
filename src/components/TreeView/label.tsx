import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((_) => ({
  labelRoot: {
    width: "100%",
    position: "relative",
    paddingLeft: 4,
  },
}));

const Label: React.FC<{}> = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography
      role="menuitem"
      component="div"
      className={clsx(classes.labelRoot)}
    >
      {children}
    </Typography>
  );
};

export default Label;

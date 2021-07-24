import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((_) => ({
  iconContanner: {
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 4,
    "& svg": {
      fontSize: 18,
    },
  },
}));

const IconContanner: React.FC<{
  collapseIcon: React.ReactNode | string;
  expandIcon: React.ReactNode;
  expanded: boolean;
  width: number | string;
}> = ({ collapseIcon, expandIcon, expanded, width = 15 }) => {
  const classes = useStyles();

  return (
    <span className={clsx(classes.iconContanner)} style={{ width: width }}>
      {expanded ? expandIcon : collapseIcon}
    </span>
  );
};

export default IconContanner;

import React from "react";
import classes from "./style.module.scss";

const IconContainer: React.FC<{
  collapseIcon: React.ReactNode | string;
  expandIcon: React.ReactNode;
  expanded: boolean;
  width: number | string;
}> = ({ collapseIcon, expandIcon, expanded, width = 15 }) => {
  return (
    <span className={classes["icon-container"]} style={{ width: width }}>
      {expanded ? expandIcon : collapseIcon}
    </span>
  );
};

export default IconContainer;

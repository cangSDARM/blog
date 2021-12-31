import React from "react";
import * as classes from "./style.module.css";

const IconContainer: React.FC<{
  collapseIcon: React.ReactNode | string;
  expandIcon: React.ReactNode;
  expanded: boolean;
  width: number | string;
}> = ({ collapseIcon, expandIcon, expanded, width = 15 }) => {
  return (
    <span className={classes.iconContainer} style={{ width: width }}>
      {expanded ? expandIcon : collapseIcon}
    </span>
  );
};

export default IconContainer;

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { TreeIconContext, TreeSelectorContext } from "./context";

const useTreeStyles = makeStyles((_) => ({
  root: {
    margin: "1.4em 0 !important",
    display: "table",
  },
  label: {
    display: "flex",
  },
  group: {
    marginTop: "1ex !important",
  },
  labelItem: {
    width: "100%",
    borderBottom: "none !important",
    color: "rgb(26,26,26) !important",
    textDecoration: "none",
    cursor: "pointer",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
  },
}));

const TreeView: React.FC<{
  className: string;
  collapseIcon: React.ReactNode;
  expandIcon: React.ReactNode;
  selected: string[];
  style: React.HtmlHTMLAttributes<HTMLUListElement>["style"];
}> = ({ className, collapseIcon, expandIcon, selected, style, children }) => {
  const classes = useTreeStyles();

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useEffect(() => {
    setSelectedNodes(selected);
  }, [selected]);

  return (
    <ul role="tree" className={clsx(classes.root, className)} style={style}>
      <TreeIconContext.Provider
        value={{ collapseIcon, expandedIcon: expandIcon }}
      >
        <TreeSelectorContext.Provider value={{ selected: selectedNodes }}>
          {children}
        </TreeSelectorContext.Provider>
      </TreeIconContext.Provider>
    </ul>
  );
};

export { default as TreeItem } from "./item";

export default TreeView;

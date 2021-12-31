import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { TreeIconContext, TreeSelectorContext } from "./context";
import * as classes from "./style.module.css";

const TreeView: React.FC<{
  className: string;
  collapseIcon: React.ReactNode;
  expandIcon: React.ReactNode;
  selected: string[];
  style: React.HtmlHTMLAttributes<HTMLUListElement>["style"];
}> = ({ className, collapseIcon, expandIcon, selected, style, children }) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useEffect(() => {
    setSelectedNodes(selected);
  }, [selected]);

  return (
    <ul role="tree" className={clsx(classes.tree, className)} style={style}>
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

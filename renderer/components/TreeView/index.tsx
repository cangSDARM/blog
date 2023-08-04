import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { TreeIconContext, TreeSelectorContext } from "./context";
import classes from "./style.module.scss";

// https://iamkate.com/code/tree-views/
const TreeView: React.FC<
  React.PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    > & {
      collapseIcon: React.ReactNode;
      expandIcon: React.ReactNode;
      selected: string[];
    }
  >
> = ({
  className,
  collapseIcon,
  expandIcon,
  selected,
  style,
  children,
  ...restProps
}) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useEffect(() => {
    setSelectedNodes(selected);
  }, [selected]);

  return (
    <ul
      role="tree"
      className={clsx(classes.tree, className)}
      style={style}
      {...restProps}
    >
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

export default TreeView;
export { default as TreeItem } from "./TreeItem";

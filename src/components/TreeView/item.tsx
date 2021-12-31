import clsx from "clsx";
import React, { memo, useContext, useEffect, useState } from "react";
import { TreeIconContext, TreeSelectorContext } from "./context";
import IconContainer from "./icon";
import Label from "./label";
import * as classes from "./style.module.css";

const IconNode: React.FC<{
  expandable: boolean;
  expandWidth: number | string;
  expanded: boolean;
}> = memo(({ expandable, expandWidth, expanded }) => {
  const context = useContext(TreeIconContext);
  return expandable ? (
    <IconContainer
      collapseIcon={context.collapseIcon}
      expandIcon={context.expandedIcon}
      expanded={!expanded}
      width={expandWidth}
    />
  ) : (
    <IconContainer
      collapseIcon={<></>}
      expandIcon={<></>}
      expanded={!expanded}
      width={expandWidth}
    />
  );
});

const TreeItem: React.FC<{
  nodeId: string;
  expandWidth?: number | string;
  label: React.ReactNode | string;
  expandable: boolean;
  defaultExpanded: boolean;
  classesNames: { group: string; label: string };
  onClick?: (e: React.MouseEvent) => void;
}> = ({
  expandable = false,
  defaultExpanded = false,

  classesNames,
  nodeId = "",
  expandWidth = 10,
  label = "",
  children = null,
  onClick = () => {},
}) => {
  const context = useContext(TreeSelectorContext);

  const [expan, setExpan] = useState(false);

  useEffect(() => {
    if (expan != defaultExpanded) setExpan(defaultExpanded);
  }, [defaultExpanded]);

  const canExpand = expandable && expan;

  const collapsedNode = (
    <div
      className={clsx(
        classes.treeItem,
        expandable ? classesNames.group : classesNames.label,
        {
          [classes.selected]: context.selected.indexOf(nodeId) > -1,
        }
      )}
      onClick={(e) => {
        setExpan(!expan);
        onClick(e);
      }}
    >
      <IconNode
        expandWidth={expandWidth}
        expandable={expandable}
        expanded={expan}
      />
      <Label>{label}</Label>
    </div>
  );

  const expandedNode = (
    <div style={{ display: "flex" }}>
      <div>{children}</div>
    </div>
  );

  return (
    <>
      {collapsedNode}
      {canExpand && expandedNode}
    </>
  );
};

export default TreeItem;

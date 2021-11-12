import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import TreeViewContext from "./context";
import IconContainer from "./icon";
import Label from "./label";

const useStyles = makeStyles((_) => ({
  treeItemRoot: {
    width: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  expandableRoot: {
    '& *[role*="menuitem"]': {
      backgroundColor: "#e8eaee",
      borderRadius: "0.25em",
    },
  },
  collapse: {
    display: "flex",
  },
}));

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
  const classes = useStyles();
  const context = useContext(TreeViewContext);

  const [expan, setExpan] = useState(false);

  useEffect(() => {
    if (expan != defaultExpanded) setExpan(defaultExpanded);
  }, [defaultExpanded]);

  const canExpand = expandable && expan;

  const iconNode = React.useMemo(
    () =>
      expandable ? (
        <IconContainer
          collapseIcon={context.collapseIcon}
          expandIcon={context.expandedIcon}
          expanded={!expan}
          width={expandWidth}
        />
      ) : (
        <IconContainer
          collapseIcon={<></>}
          expandIcon={<></>}
          expanded={!expan}
          width={expandWidth}
        />
      ),
    [context, expan, expandWidth]
  );

  const collapsedNode = (
    <div
      className={clsx(
        classes.treeItemRoot,
        context.selected.indexOf(nodeId) > -1 && classes.expandableRoot,
        expandable ? classesNames.group : classesNames.label
      )}
      onClick={(e) => {
        setExpan(!expan);
        onClick(e);
      }}
    >
      {iconNode}
      <Label>{label}</Label>
    </div>
  );

  const expandedNode = (
    <div className={clsx(classes.collapse)}>
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

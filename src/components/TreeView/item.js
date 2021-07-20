import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import TreeViewContext from "./context";
import IconContanner from "./icon";
import Label from "./label";

const useStyles = makeStyles((theme) => ({
  treeItemRoot: {
    width: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  expandableRoot: {
    '& *[role*="menuitem"]': {
      backgroundColor: "rgba(63, 81, 181, 0.16)",
    },
  },
  collapse: {
    display: "flex",
  },
}));

const TreeItem = ({
  expandable,
  defalutExpanded,
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
    if (expan != defalutExpanded) setExpan(defalutExpanded);
  }, [defalutExpanded]);

  const canExpand = expandable && expan;

  const iconNode = expandable ? (
    <IconContanner
      collapseIcon={context.collapseIcon}
      expandIcon={context.expandedIcon}
      expanded={!expan}
      width={expandWidth}
    />
  ) : (
    <IconContanner
      collapseIcon={<></>}
      expandIcon={<></>}
      expanded={!expan}
      width={expandWidth}
    />
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

TreeItem.propTypes = {
  expandable: PropTypes.bool,
  defalutExpanded: PropTypes.bool,
  expandWidth: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  label: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
  classesNames: PropTypes.shape({
    group: PropTypes.string,
    label: PropTypes.string,
  }),
  onClick: PropTypes.func,
  nodeId: PropTypes.string,
};

TreeItem.defaultProps = {
  expandable: false,
  defalutExpanded: false,
  expandWidth: 15,
  onClick: () => {},
};

export default TreeItem;

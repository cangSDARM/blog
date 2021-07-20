import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import TreeViewContext from "./context";

const useTreeStyles = makeStyles((theme) => ({
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

const TreeView = ({
  className,
  collapseIcon,
  expandIcon,
  selected,
  children,
}) => {
  const classes = useTreeStyles();

  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    setSelectedNodes(selected);
  }, [selected]);

  return (
    <ul role="tree" className={clsx(classes.root, className)}>
      <TreeViewContext.Provider
        value={{
          expandedIcon: expandIcon,
          collapseIcon,
          selected: selectedNodes,
        }}
      >
        {children}
      </TreeViewContext.Provider>
    </ul>
  );
};

TreeView.propTypes = {
  className: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ),
  collapseIcon: PropTypes.element,
  expandIcon: PropTypes.element,
  selected: PropTypes.arrayOf(PropTypes.string),
};

TreeView.defaultProps = {
  selected: [],
};

export { default as TreeItem } from "./item";

export default TreeView;

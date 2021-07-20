import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
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

const IconContanner = ({ collapseIcon, expandIcon, expanded, width = 15 }) => {
  const classes = useStyles();

  return (
    <span className={clsx(classes.iconContanner)} style={{ width: width }}>
      {expanded ? expandIcon : collapseIcon}
    </span>
  );
};

IconContanner.propTypes = {
  collapseIcon: PropTypes.element,
  expandIcon: PropTypes.element,
  expanded: PropTypes.bool,
  width: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
};

export default IconContanner;

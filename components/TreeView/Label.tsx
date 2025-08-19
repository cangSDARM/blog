import Truncate from "../Truncate";
import React from "react";
import classes from "./style.module.scss";

const Label: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Truncate as="span" maxLines={1} className={classes["label"]}>
      {children}
    </Truncate>
  );
};

export default Label;

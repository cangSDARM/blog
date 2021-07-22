import { ListItem as SListItem } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Avatar, ListItemIcon, Typography } from "../header/styled";

const Item = ({ classes, children, ...otherProps }) => {
  return (
    <SListItem className={classes.after} {...otherProps}>
      {children}
    </SListItem>
  );
};
const ListItem = withStyles({
  after: {
    paddingRight: 16 + 16,
    "&::before": {
      position: "absolute",
      bottom: 9,
      left: 48,
      right: 16,
      zIndex: -100,
      content: "''",
      width: "auto",
      clear: "both",
      height: 5,
      backgroundColor: "#bdbdbd",
    },
    "&>p>a::after": {
      content: "'\u27A4'",
      position: "absolute",
      right: 16,
      width: 16,
    },
  },
})(Item);

const SkipIndexTag = ({ tag, children, count }) => {
  if (tag.fieldValue.toString() === "index") return <></>;
  else {
    return (
      <ListItem
        component="div"
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
      >
        <ListItemIcon>
          <Avatar>{count}</Avatar>
        </ListItemIcon>
        <Typography component="p">{children}</Typography>
      </ListItem>
    );
  }
};
function tagToPath(tag) {
  return `/tags/${tag}`;
}

export { SkipIndexTag, tagToPath };

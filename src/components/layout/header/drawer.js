import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import PropType from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  Drawer as SDrawer,
  List,
  ListItem as SListItem,
  Avatar,
  ListItemIcon,
  ListSubheader,
  Typography,
  SvgIcon,
} from "./styled";

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

function SkipIndexTag({ tag, children, count }) {
  if (tag.fieldValue.toString() === "index") return <></>;
  else {
    return (
      <>
        <ListItem
          component="div"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
        >
          <ListItemIcon>
            <Avatar>{count}</Avatar>
          </ListItemIcon>
          <Typography component="p">{children}</Typography>
        </ListItem>
      </>
    );
  }
}
function tagToPath(tag) {
  return `/tags/${tag}`;
}

const Drawer = ({ open, toggle }) => {
  const { tagsGroup } = useStaticQuery(graphql`
    {
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <SDrawer open={open} onClose={toggle(false)}>
      <List component="nav" aria-label="drawer">
        <ListSubheader>All tags</ListSubheader>
        {tagsGroup?.group.map(i => {
          return (
            <SkipIndexTag
              tag={i}
              count={i?.totalCount}
              key={i?.fieldValue.toString()}
            >
              <Link to={tagToPath(i.fieldValue)}>{i.fieldValue}</Link>
            </SkipIndexTag>
          );
        })}
      </List>{" "}
    </SDrawer>
  );
};

Drawer.PropType = {
  open: PropType.bool.isRequired,
  toggle: PropType.func.isRequired,
};
export default Drawer;

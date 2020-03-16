import * as React from "react";
import { navigate } from "gatsby";
import { Chip, Avatar, Paper } from "@material-ui/core";

function tagToPath(tag) {
  return `/tags/${tag}`;
}

export default function TagsList({ tags, ...otherProps }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul {...otherProps} style={{ margin: "1rem 0" }}>
      {tags.map(
        tag =>
          tag !== "index" && (
            <Chip
              color="primary"
              avatar={<Avatar>{tag[0]}</Avatar>}
              label={tag}
              onClick={function(e) {
                e.preventDefault();
                navigate(tagToPath(tag));
              }}
              key={tag}
            />
          )
      )}
    </ul>
  );
}

import { Avatar, Chip } from "@mui/material";
import { navigate } from "gatsby";
import * as React from "react";

function tagToPath(tag: string) {
  return `/tags/${tag}`;
}

export interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags, ...otherProps }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul {...otherProps} style={{ margin: "1rem 0" }}>
      {tags.map(
        (tag) =>
          tag !== "index" && (
            <Chip
              color="primary"
              avatar={<Avatar>{tag[0]}</Avatar>}
              label={tag}
              onClick={function (e) {
                e.preventDefault();
                navigate(tagToPath(tag));
              }}
              key={tag}
            />
          )
      )}
    </ul>
  );
};

export default TagsList;

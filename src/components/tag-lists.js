import * as React from "react";
import { Link } from "gatsby";

function tagToPath(tag) {
  return `/tags/${tag}`;
}

export default function TagsList({ tags, ...otherProps }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul {...otherProps}>
      {tags.map(
        tag =>
          tag !== "index" && (
            <li key={tag}>
              <Link key={tag} to={tagToPath(tag)}>
                {tag}
              </Link>
            </li>
          )
      )}
    </ul>
  );
}

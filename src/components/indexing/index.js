import { Link } from "gatsby";
import React from "react";
import PropType from "prop-types";

function findIndex(data, slug) {
  let element;
  if (data)
    for (element of data) {
      const { node } = element;
      if (slug === node?.fields?.slug) {
        return node?.frontmatter?.index - 1;
      }
    }
  return -1;
}

/**
 * Skip elements without integer index
 * @param {Array} data
 */
function jumpNonNavigable(data) {
  return Array.from(data).filter(
    element => element?.node?.frontmatter?.index?.toString().indexOf(".") < 0
  );
}

function getPrevious(data, index) {
  if (data) return data[index - 1]?.node;
  return undefined;
}

function getNext(data, index) {
  if (data) return data[index + 1]?.node;
  return undefined;
}

function ensureExist(
  element = {
    fields: {
      slug: "/",
    },
    frontmatter: {
      title: "首页",
      index: -1,
    },
  }
) {
  return element;
}

const Indexing = ({ slug, data, ...otherProps }) => {
  data = jumpNonNavigable(data);
  const index = findIndex(data, slug);
  const previous = ensureExist(getPrevious(data, index));
  const next = ensureExist(getNext(data, index));

  return (
    index > -1 && (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        {...otherProps}
      >
        <Link to={previous.fields.slug} name="previous">
          {`<-`}
          {previous.frontmatter.title}
          {`-`}
        </Link>
        <Link to={next?.fields?.slug} name="previous">
          {`-`}
          {next?.frontmatter?.title}
          {` ->`}
        </Link>
      </div>
    )
  );
};

Indexing.PropType = {
  data: PropType.array,
  slug: PropType.string,
};

export default Indexing;

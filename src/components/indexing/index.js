import { Link } from "gatsby";
import React from "react";

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

const Wilder = ({ space }) => {
  space = space || 1;
  return (
    <span style={{ textDecoration: "line-through" }}>
      {`\x0b`.repeat(space)}
    </span>
  );
};
export default ({ slug, data }) => {
  if (data.edges) data = data.edges?.node;
  let index = findIndex(data, slug);
  const previous = ensureExist(getPrevious(data, index));
  const next = ensureExist(getNext(data, index));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to={previous.fields.slug} name="previous">
        {`<`}
        <Wilder space={20} />
        {previous.frontmatter.title}
        {` `}
        <Wilder space={40} />
      </Link>
      <Link to={next?.fields?.slug} name="previous">
        <Wilder space={40} />
        {` `}
        {next?.frontmatter?.title}
        <Wilder space={20} />
        {`>`}
      </Link>
    </div>
  );
};

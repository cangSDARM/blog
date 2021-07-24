import { Link } from "gatsby";
import React from "react";

function findIndex(data: any | undefined, slug: string) {
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
function jumpNonNavigable(data: any[]) {
  return Array.from(data).filter(
    (element) => element?.node?.frontmatter?.index?.toString().indexOf(".") < 0
  );
}

function getPrevious(data: any[], index: number) {
  if (data) return data[index - 1]?.node;
  return undefined;
}

function getNext(data: any[], index: number) {
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

function maxLength(text: string, maximum = 10) {
  let res = text.substr(0, maximum);
  if (text.length > maximum) {
    res += "...";
    res += text.substr(Math.max(res.length + 6, text.length - maximum));
  }
  return res;
}

const Indexing: React.FC<{ slug: string; data: any[] }> = ({
  slug,
  data,
  ...otherProps
}) => {
  data = jumpNonNavigable(data);
  const index = findIndex(data, slug);
  const previous = ensureExist(getPrevious(data, index));
  const next = ensureExist(getNext(data, index));

  return index > -1 ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
      {...otherProps}
    >
      {/** @ts-ignore */}
      <Link to={previous.fields.slug} name="previous">
        {`<-`}
        {maxLength(previous.frontmatter.title)}
        {`-`}
      </Link>
      {/** @ts-ignore */}
      <Link to={next?.fields?.slug} name="previous">
        {`-`}
        {maxLength(next?.frontmatter?.title)}
        {` ->`}
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default Indexing;

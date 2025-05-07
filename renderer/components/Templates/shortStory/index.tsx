import React from "react";
// TODO: fix relative path
import Resources from "../archive/resources";
import { useType } from "../archive/useType";
import Comment from "./Comment";
import clsx from "clsx";
import classes from "./style.module.scss";

const authorPrinter = (author: string, index: number) => (
  <React.Fragment key={index}>
    {index !== 0 && "，"}
    {author}
  </React.Fragment>
);

const Author: React.FC<{
  authors: any;
}> = ({ authors: p }) => {
  if (typeof p !== "string") return <></>;

  const [authors, translators] = p.split("|");

  return (
    <p className={classes.Author}>
      【作者】
      {authors.split(",").map(authorPrinter)}
      <i />
      【译者】
      {translators.split(",").map(authorPrinter)}
    </p>
  );
};

const ShortStory: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const {
    type,
    ignoredDepth = [],
    title,
    authors = [],
    subtitle = "",
  } = frontmatter;
  const { toc } = compiled;

  const className = useType(type);

  return (
    <>
      <div className={clsx(className, classes.Root)}>
        <div role="article">
          <h1>{title}</h1>
          <h2 data-sub-title>{subtitle}</h2>
          <Resources
            avatar={frontmatter?.avatar}
            reference={frontmatter?.reference || undefined}
            toc={toc}
            ignoredDepth={ignoredDepth}
          />
          <article>
            <Author authors={authors} />
            {children({
              Comment,
            })}
          </article>
        </div>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default ShortStory;

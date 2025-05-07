import React from "react";
// TODO: fix relative path
import Resources from "../archive/resources";
import { useType } from "../archive/useType";
import Comment from "./Comment";
import clsx from "clsx";
import classes from "./style.module.scss";

const ShortStory: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const {
    type,
    ignoredDepth = [],
    title,
    translator = "",
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
            {translator && <p>译者：{translator}</p>}
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

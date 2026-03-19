import React from "react";
import { Figure, Selector } from "./components";
import classes from "./style.module.scss";

const Math: React.FC<TemplateProps> = ({ frontmatter, children, compiled }) => {
  const { title } = frontmatter;

  return (
    <>
      <div className={classes.mathPost}>
        <h1>{title}</h1>
        <article>{children({ Figure, Selector })}</article>
      </div>
    </>
  );
};

export default Math;

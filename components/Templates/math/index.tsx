import React from "react";

const Math: React.FC<TemplateProps> = ({ frontmatter, children, compiled }) => {
  const { title } = frontmatter;

  return (
    <>
      <div className="math-post">
        <h1>{title}</h1>
        <article>{children({})}</article>
      </div>
    </>
  );
};

export default Math;

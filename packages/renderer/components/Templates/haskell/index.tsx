import React from "react";

const Haskell: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const { title } = frontmatter;

  return (
    <>
      <div className="haskell-post">
        <h1>{title}</h1>
        {/* <TagsList tags={frontmatter.tags} /> */}
        <article>{children({})}</article>
      </div>
    </>
  );
};

export default Haskell;

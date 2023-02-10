import React from "react";
import Resources from "./resources";
import { useType } from "./useType";

const Archive: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const { type, title } = frontmatter;
  const { headings } = compiled;

  const className = useType(type);

  return (
    <>
      <div className={className}>
        <h1>{title}</h1>
        <Resources
          avatar={frontmatter?.avatar}
          reference={frontmatter?.reference || undefined}
          toc={{}}
        />
        <article>
          {children({
            Paper: ({ children }: any) => <>{children}</>,
          })}
        </article>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default Archive;

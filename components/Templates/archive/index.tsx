import React from "react";
import { useType } from "./useType";

const Archive: React.FC<TemplateProps> = ({ frontmatter, children }) => {
  const { type, title } = frontmatter;

  const className = useType(type);

  return (
    <>
      <div className={className}>
        <h1>{title}</h1>
        <article>
          {children({
            Paper: (a: any) => <>{a}</>,
          })}
        </article>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default Archive;

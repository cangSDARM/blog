import React from "react";
import Resources from "@/components/Resources";
import { useType } from "./useType";

const Archive: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const { type, ignoredDepth = [], title } = frontmatter;
  const { toc } = compiled;

  const className = useType(type);

  return (
    <>
      <div className={className}>
        <div role="article">
          <h1>{title}</h1>
          <Resources
            avatar={frontmatter?.avatar}
            reference={frontmatter?.reference || undefined}
            toc={toc}
            ignoredDepth={ignoredDepth}
          />
          <article>
            {children({
              Paper: ({ children }: any) => <>{children}</>,
            })}
          </article>
        </div>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default Archive;

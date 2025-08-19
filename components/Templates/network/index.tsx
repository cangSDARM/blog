import React from "react";
import styles from "./styles.module.scss";

const shotCodes = {
  h3: (props: any) => <h3 style={{ margin: `20px 0 10px` }} {...props} />,
  // p: props => <p className={styles.cp} {...props} />,
  blockquote: (props: any) => (
    <blockquote className={styles.cblockquote} {...props} />
  ),
};

const Network: React.FC<TemplateProps> = ({
  frontmatter,
  children,
  compiled,
}) => {
  const { title } = frontmatter;

  return (
    <>
      <div
        className={styles.netPost}
        style={{
          maxWidth: `960px`,
          fontFamily: `YaHei, Helvetica, arial, sans-serif`,
          fontSize: `16px`,
        }}
      >
        <h1>{title}</h1>
        {/* <Indexing slug={fields.slug} data={allMdx?.edges} /> */}
        {/* <TagsList tags={frontmatter.tags} /> */}
        {children(shotCodes)}
      </div>
    </>
  );
};

export default Network;

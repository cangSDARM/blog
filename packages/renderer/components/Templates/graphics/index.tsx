import React from "react";
import styles from "./style.module.scss";
import {
  Anchor,
  Aphorism,
  CommentList,
  Expansion,
  Model,
  ModelList,
  Quote,
  Tab,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./components";

const shotCodes = {
  Tab,
  Navigation: (props: any) => <nav {...props}></nav>,
  Anchor,
  Quote,
  Model,
  Expansion,
  Aphorism,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  hr: (props: any) => <hr className={styles.hrStyle} {...props} />,
  a: (props: any) => <a className={styles.aStyle} {...props} />,
};

const Graphics: TemplateComponent = ({ frontmatter, children, compiled }) => {
  const { title } = frontmatter;

  return (
    <>
      <div className={styles.graphicsPost}>
        <h1>
          <a
            href="#"
            title={`${frontmatter.date}`}
            className={styles.titleStyle}
          >
            {title}
          </a>
        </h1>
        {/* <Indexing
          slug={fields.slug}
          data={allMdx?.edges}
          className={styles.indexingStyle}
        />
        <TagsList tags={frontmatter.tags} className={styles.taglistsStyle} /> */}
        {children(shotCodes)}
        <div id="Comment" className={styles.Comment} />
      </div>
    </>
  );
};

Graphics.rootStyle = styles.mainStyle;

export default Graphics;

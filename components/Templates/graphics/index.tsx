import React from "react";
import styles from "./style.module.scss";
import {
  Anchor,
  Aphorism,
  CommentList,
  Expansion,
  Model,
  ModalContextProvider,
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
  const { title, ImgList, QuoteList } = frontmatter;

  CommentList(QuoteList);

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
        <ModalContextProvider images={ImgList}>
          {children(shotCodes)}
        </ModalContextProvider>
        {/* <Indexing
          slug={fields.slug}
          data={allMdx?.edges}
          className={styles.indexingStyle}
        />
        <TagsList tags={frontmatter.tags} className={styles.taglistsStyle} /> */}
        <div id="Comment" className={styles.Comment} />
      </div>
    </>
  );
};

Graphics.rootStyle = styles.mainStyle;

export default Graphics;

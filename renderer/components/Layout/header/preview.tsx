import React from "react";
import styles from "./style.module.scss";
import ListItem from "./item";

const Preview: React.FC<{ imgSrc: string; fileList?: any[] }> = ({
  imgSrc,
  fileList = [],
}) => {
  return (
    <div className={styles["preview"]}>
      <div data-layer="bg" style={{ backgroundImage: `url(${imgSrc})` }}></div>
      <ul data-layer="list">
        {fileList.map((file) => (
          <ListItem
            key={file.file}
            href={file.url}
            title={file.frontmatter.title}
          >
            {file.rawContent?.substring(0, 64) || file.frontmatter?.date}
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default Preview;

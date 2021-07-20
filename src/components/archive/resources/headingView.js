import { SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import TreeView, { TreeItem } from "../../TreeView";
import useScrollSpy from "./scrollspy";

const useTreeStyles = makeStyles((theme) => ({
  root: {
    margin: "1.4em 0 !important",
    display: "table",
  },
  label: {
    display: "flex",
  },
  group: {
    marginTop: "1ex !important",
  },
  labelItem: {
    width: "100%",
    borderBottom: "none !important",
    color: "rgb(26,26,26) !important",
    textDecoration: "none",
    cursor: "pointer",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
  },
}));

const indexing = "目录";
const HeadingView = ({ toc }) => {
  const spyUrl = toc.map((post) => ({
    hash: post["url"].substring(1),
  }));

  const [selected, setSelected] = useState([]);

  const active = useScrollSpy({
    items: spyUrl,
    target: "scroll-spy",
  });

  useEffect(() => {
    if (active == null) setSelected([toc[0]?.url]);
    else setSelected([`#${active}`]);
  }, [active, toc]);

  const classes = useTreeStyles();

  const handleSelect = (event, node) => {
    setSelected([node.url]);
  };

  const renderTreeItem = (nodes) => (
    <TreeItem
      key={nodes.url}
      nodeId={nodes.url}
      classesNames={{
        label: classes.label,
        group: classes.group,
      }}
      label={
        <a className={classes.labelItem} href={nodes.url}>
          {nodes.title}
        </a>
      }
      onClick={(e) => handleSelect(e, nodes)}
      expandable={!!nodes.items}
      defalutExpanded={nodes.url == "#"}
    >
      {Array.isArray(nodes.items)
        ? nodes.items.map((node) => {
            return renderTreeItem(node);
          })
        : null}
    </TreeItem>
  );

  return (
    toc.length > 0 && (
      <TreeView
        style={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
        }}
        className={classes.root}
        selected={selected}
        collapseIcon={
          <SvgIcon>
            <path
              fill="currentColor"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </SvgIcon>
        }
        expandIcon={
          <SvgIcon>
            <path
              fill="currentColor"
              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
            />
          </SvgIcon>
        }
      >
        {renderTreeItem({
          title: indexing,
          url: "#",
          items: toc,
        })}
      </TreeView>
    )
  );
};

export default HeadingView;

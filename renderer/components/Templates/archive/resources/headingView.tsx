import React, { useCallback, useEffect, useMemo, useState } from "react";
import TreeView, { TreeItem } from "../../../TreeView";
import classes from "./style.module.scss";
import useIntersectionObserver from "./useIntersectionObserver";
import _ from "lodash";

function deepFlatten(TOCs: TOCItem[]) {
  const rest = [...TOCs];
  const lgtm: Omit<TOCItem, "children">[] = [];

  let toc = rest.shift();
  while (toc) {
    lgtm.push(_.omit(toc, ["children"]));

    if (toc.children) {
      rest.push(...toc.children);
    }
    toc = rest.shift();
  }

  return lgtm;
}

function getHash(str?: string) {
  if (!str) return "";
  if (str.startsWith("#")) return str.substring(1);

  return str;
}

function getBanHash(str: string) {
  if (!str) return "#";
  if (!str.startsWith("#")) return "#" + str;

  return str;
}

interface HeadingViewProps {
  toc: TOCItem[];
  ignoredDepth?: (1 | 2 | 3 | 4 | 5 | 6)[];
  indexingTitle?: string;
}

const HeadingView: React.FC<HeadingViewProps> = ({
  toc = [],
  ignoredDepth = [],
  indexingTitle = "目录",
}) => {
  const spyUrl = useMemo(
    () => deepFlatten(toc).map((item) => ({ hash: getHash(item["id"]) })),
    [toc]
  );

  const [selected, setSelected] = useState<string[]>([]);

  const activated = useIntersectionObserver(spyUrl);

  useEffect(() => {
    if (!activated) setSelected([getHash(toc[0]?.id)]);
    else setSelected([getHash(activated)]);
  }, [activated, toc]);

  const renderTreeChildren = useCallback((nodes: TOCItem) => {
    return Array.isArray(nodes.children)
      ? nodes.children.map((node) => {
          return renderTreeItem(node);
        })
      : null;
  }, []);

  const renderTreeItem = useCallback(
    (nodes: TOCItem): JSX.Element =>
      (ignoredDepth as unknown as number[]).includes(nodes.depth) ? (
        <React.Fragment key={nodes.id}>
          {renderTreeChildren(nodes)}
        </React.Fragment>
      ) : (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          classesNames={{
            label: classes.label,
            group: classes.group,
            selected: classes.selected,
          }}
          label={
            <a
              className={classes.labelItem}
              href={getBanHash(nodes.id)}
              onClick={(e) => {
                e.preventDefault();
                try {
                  document.querySelector(getBanHash(nodes.id))?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                } catch {}
              }}
            >
              {nodes.value}
            </a>
          }
          expandable={!!nodes.children}
          defaultExpanded={nodes.id == "#"}
        >
          {renderTreeChildren(nodes)}
        </TreeItem>
      ),
    [classes]
  );

  return toc.length > 0 ? (
    <TreeView
      style={{
        flexGrow: 1,
        maxWidth: 200,
      }}
      className={classes["tree"]}
      selected={selected}
      collapseIcon={
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      }
      expandIcon={
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      }
    >
      {renderTreeItem({
        value: indexingTitle,
        id: "#",
        children: toc,
        depth: 0,
      })}
    </TreeView>
  ) : (
    <></>
  );
};

export default HeadingView;

export {};

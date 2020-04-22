import React, { useState } from "react";
import { useLocation } from "@reach/router";
import { SvgIcon } from "@material-ui/core";
import { TreeItem, TreeView as MTreeView } from "@material-ui/lab";
import { navigate, withPrefix } from "gatsby";
import rightAnchor from "../rightAnchor";

const indexing = "目录";
const TreeView = ({ headings }) => {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const location = useLocation();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    const anchor = rightAnchor
      .anchorSet(nodeIds)
      .replaceOprator()
      .replaceWhiteSpace()
      .splitId().anchor;
    if (anchor === indexing) return;
    navigate(`${location.pathname}#${anchor}`);
  };

  const renderTree = (nodes, index) => (
    <TreeItem
      key={index + nodes.value}
      nodeId={index + nodes.value}
      label={nodes.value}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node, index) => {
            return renderTree(node, index);
          })
        : null}
    </TreeItem>
  );

  return (
    headings.length > 0 && (
      <MTreeView
        style={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
        }}
        defaultExpanded={[`0${indexing}`]}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        defaultCollapseIcon={
          <SvgIcon>
            <path
              fill="currentColor"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </SvgIcon>
        }
        defaultExpandIcon={
          <SvgIcon>
            <path
              fill="currentColor"
              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
            />
          </SvgIcon>
        }
      >
        {renderTree(
          {
            value: indexing,
            children: headings,
          },
          0
        )}
      </MTreeView>
    )
  );
};

export default TreeView;

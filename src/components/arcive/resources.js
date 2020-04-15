import React, { useState } from "react";
import { Avatar, SvgIcon } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import PropTypes from "prop-types";
import { navigate, withPrefix } from "gatsby";
import { useLocation } from "@reach/router";
import Navgation from "../naviagtion";
import mainstyles from "./main.module.css";
import rightAnchor from "./rightAnchor";

const Resources = ({ avatar, reference, headings }) => {
  let [refTitle, refLink] = reference.split("|");

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
    <div className={mainstyles.references}>
      <div>
        <Avatar src={avatar}>{refTitle}</Avatar>
        <nav>
          <span style={{ color: "#8590a6", fontSize: 12 }}>
            首发于{` `}
            {refLink.split("https://").pop().split(".com").shift()}
          </span>
          <Navgation to={refLink} desc={refTitle} external />
        </nav>
      </div>
      <TreeView
        style={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
        }}
        defaultExpanded={["0目录"]}
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
            value: "目录",
            children: headings,
          },
          0
        )}
      </TreeView>
    </div>
  );
};

Resources.PropType = {
  avatar: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string),
};

Resources.defaultProps = {
  avatar: "",
  reference: "",
  headings: [],
};

export default Resources;

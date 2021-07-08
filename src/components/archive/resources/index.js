import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Navigation from "../../naviagtion";
import * as mainstyles from "../main.module.css";
import TreeView from "./treeView";

const Resources = ({ avatar, reference, toc }) => {
  const [refTitle, refLink] = reference.split("|");

  return (
    reference && (
      <div className={mainstyles.references}>
        <div>
          <Avatar src={avatar}>{refTitle}</Avatar>
          <nav>
            <span style={{ color: "#8590a6", fontSize: 12 }}>
              首发于{` `}
              {refLink
                .split("https://")
                .pop()
                .split(/\.(com|org|cn|io).*/iu)
                .shift()}
            </span>
            <Navigation to={refLink} desc={refTitle} external />
          </nav>
        </div>
        <TreeView toc={toc?.items ?? []} />
      </div>
    )
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

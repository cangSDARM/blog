import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import Navgation from "../../naviagtion";
import mainstyles from "../main.module.css";
import TreeView from "./treeView";

const Resources = ({ avatar, reference, headings }) => {
  let [refTitle, refLink] = reference.split("|");

  return (
    reference && (
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
        <TreeView headings={headings} />
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
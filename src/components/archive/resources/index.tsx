import { Avatar } from "@material-ui/core";
import React from "react";
import Navigation from "../../naviagtion";
//@ts-ignore
import * as mainstyles from "../main.module.css";
import HeadingView from "./headingView";

const Resources: React.FC<{ avatar: string; reference: string; toc: any }> = ({
  avatar = '',
  reference = '',
  toc,
}) => {
  const [refTitle, refLink] = reference.split("|");

  return reference ? (
    <div className={mainstyles.references}>
      <div>
        <Avatar src={avatar}>{refTitle}</Avatar>
        <nav>
          <span style={{ color: "#8590a6", fontSize: 12 }}>
            首发于{` `}
            {refLink
              ?.split("https://")
              ?.pop()
              ?.split(/\.(com|org|cn|io).*/iu)
              ?.shift()}
          </span>
          <Navigation to={refLink} desc={refTitle} external />
        </nav>
      </div>
      <HeadingView toc={toc?.items ?? []} />
    </div>
  ) : (
    <></>
  );
};

export default Resources;

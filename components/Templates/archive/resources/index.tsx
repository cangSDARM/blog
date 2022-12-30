import Avatar from "@/components/Avatar";
import Link from "next/link";
import React from "react";
import mainStyles from "./index.module.scss";
// import HeadingView from "./headingView";

const Resources: React.FC<{ avatar: string; reference: string; toc: any }> = ({
  avatar = "",
  reference = "",
  toc,
}) => {
  const [refTitle, refLink] = reference.split("|");

  return reference ? (
    <div className={mainStyles.references}>
      <div>
        <Avatar
          appearance="circular"
          className={mainStyles.avatar}
          src={avatar}
        >
          {refTitle}
        </Avatar>
        <nav>
          <span style={{ color: "#8590a6", fontSize: 12 }}>
            首发于{` `}
            {refLink
              ?.split("https://")
              ?.pop()
              ?.split(/\.(com|org|cn|io).*/iu)
              ?.shift()}
          </span>
          <Link href={refLink}>{refTitle}</Link>
        </nav>
      </div>
      {/* <HeadingView toc={toc?.items ?? []} /> */}
    </div>
  ) : (
    <></>
  );
};

export default Resources;

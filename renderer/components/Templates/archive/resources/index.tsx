import Avatar from "@/components/Avatar";
import Surface from "@/components/Surface";
import Link from "next/link";
import React from "react";
import mainStyles from "./style.module.scss";
import HeadingView from "./headingView";

const Resources: React.FC<{
  avatar: string;
  reference: string;
  toc: TOCItem[];
  ignoredDepth?: number[];
}> = ({ avatar = "", reference = "", toc, ignoredDepth = [] }) => {
  const [refTitle, refLink] = reference.split("|");

  return reference ? (
    <Surface appearance="minimum" className={mainStyles.references}>
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
      <HeadingView toc={toc ?? []} ignoredDepth={ignoredDepth as any[]} />
    </Surface>
  ) : (
    <></>
  );
};

export default Resources;

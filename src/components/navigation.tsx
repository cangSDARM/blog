import React from "react";
import { Link as GLink } from "gatsby";
import { Location, WindowLocation } from "@reach/router";
import { Link as MLink } from "@material-ui/core";
import { FC } from "react";

class SameLevel {
  path: string;
  wantTo: string;
  constructor(path: string, to: string) {
    this.path = path;
    this.wantTo = to;
  }

  check() {
    return this.sameLevelIndex().sameLevelOthers();
  }

  sameLevelIndex() {
    let { wantTo, path } = this;
    if (wantTo === "./") {
      if (path.endsWith("/")) path = path.substr(0, path.length - 1);
      path = path.substr(0, path.lastIndexOf("/"));
    }

    return this.setProperties({ path });
  }

  sameLevelOthers() {
    let { wantTo, path } = this;
    if (wantTo.startsWith("./")) {
      wantTo = wantTo.replace("./", "");
      path = path.concat(`/${wantTo}`);
    }

    return this.setProperties({ path, wantTo });
  }

  setProperties(props: any) {
    Object.keys(props).forEach((key) => {
      (this as any)[key] = props[key];
    });

    return this;
  }
}

const Navigation: FC<{
  desc: React.ReactNode | string;
  to: string;
  external: boolean;
}> = ({ desc = "", to = "", external = false }) => {
  const Link = ({ location }: { location: WindowLocation }) => {
    const sameLevel = new SameLevel(location.pathname, to.toString().trim());
    const { path } = sameLevel.check();

    return (
      <MLink underline="none" color="textPrimary" component={GLink} to={path}>
        {desc}
      </MLink>
    );
  };

  // console.log(to);

  return !external ? (
    <Location>{(locationProps) => <Link {...locationProps} />}</Location>
  ) : (
    <MLink underline="none" color="textPrimary" href={to}>
      {desc}
    </MLink>
  );
};

export default Navigation;

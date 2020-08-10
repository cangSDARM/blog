import React from "react";
import PropTypes from "prop-types";
import { Link as GLink } from "gatsby";
import { Location } from "@reach/router";
import { Link as MLink } from "@material-ui/core";

class SameLevel {
  path;
  wantTo;
  constructor(path, to) {
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

  setProperties(props) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });

    return this;
  }
}

const Navigation = ({ desc, to, external }) => {
  const Link = ({ location }) => {
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

Navigation.defaultProps = {
  desc: "",
  to: "",
  external: false,
};

Navigation.PropType = {
  desc: PropTypes.string,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
};

export default Navigation;

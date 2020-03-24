import React, { Fragment, useState } from "react";
import { Link as GLink } from "gatsby";
import { Location } from "@reach/router";
import { displayExpantion, displayComment } from "./utils";
import Img from "../image";
import styles from "./style.module.css";
import { Typography, Link as MLink } from "@material-ui/core";

let QueryList = [];
let ImgList = [];

export const CommentList = list => {
  QueryList = list;
};

export const ModelList = list => {
  ImgList = list;
};

export const Naviagtion = ({ desc, to }) => {
  const Link = ({ location }) => {
    let path = location.pathname;
    to = to.toString().trim();
    if (to === "./") {
      if (path.endsWith("/")) {
        path = path.substr(0, path.length - 1);
      }
      path = path.substr(0, path.lastIndexOf("/"));
    } else if (to.startsWith("./")) {
      to = to.replace("./", "");
      path = path.concat(to);
    }
    return (
      <MLink underline="none" color="textPrimary" component={GLink} to={path}>
        {desc}
      </MLink>
    );
  };

  return <Location>{locationProps => <Link {...locationProps} />}</Location>;
};

export const Tab = ({ children, expan }) => {
  let classes = [styles.Tab];
  if (expan) classes.push(styles.hidden);
  classes = classes.join(" ");
  return children ? (
    <Fragment>
      <div className={classes}>{children}</div>
      {expan && <br />}
    </Fragment>
  ) : (
    <div className={classes}></div>
  );
};

export const Expansion = ({ children }) => {
  return (
    <div
      className={styles.Expansion}
      onClick={e => {
        displayExpantion(e.currentTarget, styles);
      }}
    >
      {children}
    </div>
  );
};

export const Aphorism = ({ children }) => {
  return (
    <div
      style={{
        width: `100%`,
        textAlign: `center`,
        margin: `0.5rem auto`,
      }}
    >
      <span className={styles.aphorism}>{children}</span>
    </div>
  );
};

export const Model = ({ about, children }) => {
  const [curr, setState] = useState(false);
  const path = ImgList[about.replace("@", "") - 1];
  const Image = function() {
    return (
      <Img
        title="缩小"
        path={`graphics/${path}`}
        imgStyle={{
          objectFit: "none",
        }}
        style={{
          height: `100vh`,
        }}
      />
    );
  };

  return (
    <div
      className={styles.model}
      onClick={function() {
        setState(true);
      }}
    >
      {children}
      {curr && (
        <div
          id={`model${about}`}
          onClick={function(e) {
            e.stopPropagation();
            setState(false);
          }}
          className={`${styles.FullScreen}`}
        >
          <Image />
        </div>
      )}
    </div>
  );
};

export const Quote = ({ id, children }) => {
  return (
    <span
      className={styles.Quote}
      id={id}
      onMouseOver={e => {
        if (QueryList[id.replace("#", "") - 1])
          displayComment.onOver(QueryList[id.replace("#", "") - 1]);
        else
          displayComment.onOver(
            `Warn: no such Quote be found in ${QueryList} at ${id}`
          );
      }}
      onMouseOut={e => displayComment.onOut()}
    >
      {children}
    </span>
  );
};

export const Anchor = ({ name, children }) => {
  if (!name) {
    name = children.toString();
  }
  return (
    <h3>
      <span name={name}>{children}</span>
    </h3>
  );
};

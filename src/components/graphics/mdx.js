import React, { Fragment, useState } from "react";
import { Location } from "@reach/router";
import { Modal } from "@material-ui/core";
import { TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";

import { displayExpansion, displayComment } from "./utils";
import { Table as STable } from "./styled";
import Img from "../image";
import styles from "./style.module.css";

//TODO: fix aria-role issue, currencly i dont know the right role

let QueryList = [];
let ImgList = [];

export const CommentList = (list) => {
  QueryList = list;
};

export const ModelList = (list) => {
  ImgList = list;
};

export const Table = ({ children, title, ...otherProps }) => {
  const colSpan = Array.from(children[0]?.cells)?.length ?? 2;
  return (
    <STable size="small" {...otherProps}>
      {title && (
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={colSpan}
              style={{ fontSize: 20 }}
            >
              {title}
            </TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {children.map((row, key) => (
          <TableRow key={key} style={row.style}>
            {row.cells.map((cell, ckey) => {
              const props = row.props ? row.props[ckey] : {};
              return (
                <TableCell
                  {...props}
                  component={row.component ? row.component[ckey] : undefined}
                  key={ckey}
                  style={row.cellStyle}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </STable>
  );
};

export const Tab = ({ children, expan, vicinage }) => {
  let classes = [styles.Tab];
  if (expan) classes.push(styles.hidden);
  classes = classes.join(" ");
  let RES = children ? (
    <Fragment>
      <div className={classes}>{children}</div>
      {expan && <br />}
    </Fragment>
  ) : (
    <div className={classes} />
  );

  RES = vicinage ? <div className={styles.Tab} vicinage="true" /> : RES;

  return RES;
};

export const Expansion = ({ children }) => {
  return (
    <div
      role="expansion"
      className={styles.Expansion}
      onClick={(e) => {
        displayExpansion(e.currentTarget, styles);
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
  const Image = function () {
    return (
      <Img
        title="缩小"
        path={`graphics/${path}`}
        ext={"png"}
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
      onClick={function () {
        setState(true);
      }}
    >
      {children}
      {curr && (
        <Modal
          open={curr}
          id={`model${about}`}
          onClick={function (e) {
            e.stopPropagation();
            setState(false);
          }}
          className={`${styles.FullScreen}`}
        >
          <Image />
        </Modal>
      )}
    </div>
  );
};

export const Quote = ({ id, children }) => {
  const focus = () => {
    if (QueryList[id.replace("#", "") - 1])
      displayComment.onOver(QueryList[id.replace("#", "") - 1]);
    else
      displayComment.onOver(
        `Warn: no such Quote be found in ${QueryList} at ${id}`
      );
  };

  const blur = () => displayComment.onOut();

  return (
    <span
      className={styles.Quote}
      id={id}
      onMouseOver={focus}
      onFocus={focus}
      onMouseOut={blur}
      onBlur={blur}
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

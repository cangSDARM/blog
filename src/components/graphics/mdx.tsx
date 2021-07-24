import {
  Modal,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import Img from "../image";
import clsx from "clsx";
//@ts-ignore
import * as styles from "./style.module.css";
import { Table as STable } from "./styled";
import { displayComment, displayExpansion } from "./utils";

//TODO: fix aria-role issue, currencly i dont know the right role

let QueryList: any[] = [];
let ImgList: any[] = [];

export const CommentList = function <T extends any[]>(list: T) {
  QueryList = list;
};

export const ModelList = function <T extends any[]>(list: T) {
  ImgList = list;
};

export const Table: React.FC<{ title: string }> = ({
  children,
  title,
  ...otherProps
}) => {
  //@ts-ignore
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
        {/** @ts-ignore */}
        {children?.map((row, key) => (
          <TableRow key={key} style={row.style}>
            {Array.from(row.cells).map((cell, ckey) => {
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

export const Tab: React.FC<{ expan: boolean; vicinage: boolean }> = ({
  children,
  expan,
  vicinage,
}) => {
  const classes: string[] = [styles.Tab];
  if (expan) classes.push(styles.hidden);

  let RES = children ? (
    <Fragment>
      <div className={clsx(classes)}>{children}</div>
      {expan && <br />}
    </Fragment>
  ) : (
    <div className={clsx(classes)} />
  );

  {
    /** @ts-ignore */
  }
  RES = vicinage ? <div className={styles.Tab} vicinage="true" /> : RES;

  return RES;
};

export const Expansion: React.FC<{}> = ({ children }) => {
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

export const Aphorism: React.FC<{}> = ({ children }) => {
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

export const Model: React.FC<{ about: string }> = ({ about, children }) => {
  const [curr, setState] = useState(false);
  const path = ImgList[parseInt(about.replace("@", "")) - 1];
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

export const Quote: React.FC<{ id: string }> = ({ id, children }) => {
  const focus = () => {
    if (QueryList[parseInt(id.replace("#", "")) - 1])
      displayComment.onOver(QueryList[parseInt(id.replace("#", "")) - 1]);
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

export const Anchor: React.FC<{ name: string }> = ({ name, children }) => {
  if (!name) {
    name = children?.toString() || "";
  }
  return (
    <h3>
      {/** @ts-ignore */}
      <span name={name}>{children}</span>
    </h3>
  );
};

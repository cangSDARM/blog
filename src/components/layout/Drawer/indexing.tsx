import { Avatar, ListItem, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import useAnime from "../../useAnime";
import { ListItemIcon, Typography } from "../header/styled";

const useStyles = makeStyles((_) => ({
  listItem: {
    margin: "3px 4px",
    boxSizing: "border-box",
    width: "auto",
    alignItems: "baseline",

    "& a": {
      color: "rgb(17,24,39)",
    },
  },
  acrylic: {
    borderRadius: "0.2rem",
    background: "inherit",
    overflow: "hidden",
    backgroundBlendMode: "exclusion",

    "&>::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -99,
      boxShadow: "inset 0 0 2000rem rgba(9, 30, 66, 0.04)",
      filter: "blur(10px)",
      background: "inherit",
      backdropFilter: "blur(30rem) saturate(120%)",
    },
  },
  avatar: {
    width: "1.25em",
    fontSize: "1em",
    height: "1.25em",
    backdropFilter: "contrast(0.5)",
  },
}));

const SkipIndexTag: React.FC<{
  tag: any;
  count: number;
}> = ({ tag, children, count }) => {
  const anime = useAnime();
  const [entered, setEntered] = useState(false);
  const [bgGlow, setBgGlow] = useState("");

  const classes = useStyles();

  const mouseEnter = (e: React.MouseEvent) => {
    setEntered(true);
    const targetBox = e?.currentTarget?.getBoundingClientRect();

    if (targetBox) {
      anime({
        targets: "outer-poiner",
        duration: 200,
        translateX: targetBox.left,
        translateY: targetBox.top,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "rgba(9, 30, 66, 0.1)",
      });
    }
  };

  const mouseLeave = (_: React.MouseEvent) => {
    setEntered(false);
    setBgGlow("");

    anime({
      targets: "outer-poiner",
      duration: 200,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "transparent",
    });
  };

  const mouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget?.getBoundingClientRect();
    if (!bounds) return;

    const leftX = e.clientX - bounds.x;
    const topY = e.clientY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    setBgGlow(
      `
      radial-gradient(
        circle at
        ${center.x + bounds.width / 2}px
        ${center.y + bounds.height / 2}px,
        #ffffff1f,
        #3030301A
      )
    `.trim()
    );
  };

  if (tag.fieldValue.toString() === "index") return <></>;
  else {
    return (
      <ListItem
        className={clsx(classes.listItem, classes.acrylic)}
        component="div"
        style={{
          backgroundImage: bgGlow,
          border: `1px solid ${entered ? "rgba(255,255,255,0.15)" : "#fff0"}`,
        }}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        onFocus={(event: React.FocusEvent) => event.stopPropagation()}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
      >
        <ListItemIcon>
          <Avatar className={clsx(classes.acrylic, classes.avatar)}>
            {count}
          </Avatar>
        </ListItemIcon>
        <Typography>{children}</Typography>
      </ListItem>
    );
  }
};

function tagToPath(tag: string) {
  return `/tags/${tag}`;
}

export { SkipIndexTag, tagToPath };
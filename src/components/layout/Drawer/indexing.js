import { Avatar, ListItem, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import useAnime from "../../useAnime";
import { ListItemIcon, Typography } from "../header/styled";

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingRight: 16 + 16,
    marginBottom: 1,
    boxSizing: "border-box",

    "&>p>a::after": {
      content: "'\u27A4'",
      position: "absolute",
      right: 16,
      width: 16,
    },
    "& a": {
      color: "rgb(63 81 181)",
    },
  },
  acrylic: {
    borderRadius: "0.2rem",
    background: "inherit",
    overflow: "hidden",
    backgroundBlendMode: "exclusion",

    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -99,
      boxShadow: "inset 0 0 2000rem rgba(255, 255, 255, .5)",
      filter: "blur(10px)",
      background: "inherit",
      backdropFilter: "blur(30rem) saturate(120%)",
    },
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 0,
  },
}));

const SkipIndexTag = ({ tag, children, count }) => {
  const anime = useAnime();
  const [entered, setEntered] = useState(false);
  const [bgGlow, setBgGlow] = useState("");

  const classes = useStyles();

  const mouseEnter = (e) => {
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      });
    }
  };

  const mouseLeave = (e) => {
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

  const mouseMove = (e) => {
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
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff0f,
        #30303011
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
          border: `1px solid ${entered ? "#ffffff0f" : "#fff0"}`,
        }}
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
      >
        <ListItemIcon>
          <Avatar
            className={clsx(classes.acrylic, classes.avatar)}
            style={{ backgroundColor: "#888" }}
          >
            {count}
          </Avatar>
        </ListItemIcon>
        <Typography component="p">{children}</Typography>
      </ListItem>
    );
  }
};
function tagToPath(tag) {
  return `/tags/${tag}`;
}

export { SkipIndexTag, tagToPath };

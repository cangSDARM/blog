import { Avatar, ListItem, ListItemIcon, Typography } from "@mui/material";
import clsx from "clsx";
import { throttle } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import * as classes from "./index.module.css";

function stopPropagation<T extends { stopPropagation: () => void }>(e: T) {
  e.stopPropagation();
}

const SkipIndexTag: React.FC<{
  tag: any;
  count: number;
}> = ({ tag, children, count }) => {
  // const anime = useAnime();
  const [entered, setEntered] = useState(false);
  const [bgGlow, setBgGlow] = useState("");

  const animeRef = useRef<React.ElementRef<typeof ListItem>>(null);

  const mouseEnter = useCallback((_e: React.MouseEvent) => {
    setEntered(true);
    // const targetBox = e?.currentTarget?.getBoundingClientRect();

    // if (targetBox) {
    //   anime({
    //     targets: "outer-poiner",
    //     duration: 200,
    //     translateX: targetBox.left,
    //     translateY: targetBox.top,
    //     width: targetBox.width,
    //     height: targetBox.height,
    //     borderRadius: 0,
    //     backgroundColor: "rgba(9, 30, 66, 0.1)",
    //   });
    // }
  }, []);

  const mouseMove = useCallback(
    throttle(function (e: React.MouseEvent) {
      const bounds = animeRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const leftX = e.clientX - bounds.x;
      const topY = e.clientY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };

      setBgGlow(`
    radial-gradient(
      circle at
      ${center.x + bounds.width / 2}px
      ${center.y + bounds.height / 2}px,
      #ffffff1f,
      #3030301A)`);
    }, 20),
    [animeRef]
  );

  const mouseLeave = useCallback((_: React.MouseEvent) => {
    mouseMove.cancel();
    setEntered(false);
    setBgGlow("");
  }, []);

  if (tag.fieldValue.toString() === "index") return <></>;

  return (
    <ListItem
      ref={animeRef}
      className={clsx(classes.listItem, classes.acrylic)}
      style={{
        backgroundImage: bgGlow,
        border: `1px solid ${entered ? "rgba(255,255,255,0.15)" : "#fff0"}`,
      }}
      onClick={stopPropagation}
      onFocus={stopPropagation}
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
};

function tagToPath(tag: string) {
  return `/tags/${tag}`;
}

export { SkipIndexTag, tagToPath };

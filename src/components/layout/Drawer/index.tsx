import { Drawer as MDrawer, List, ListSubheader } from "@mui/material";
import clsx from "clsx";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ImageComponent from "../../image";
import useAnime from "../../useAnime";
import * as classes from "./index.module.css";
import { SkipIndexTag, tagToPath } from "./indexing";

const dragStart = function (e: React.DragEvent) {
  e.dataTransfer.setDragImage(new Image(), 0, 0);
};

const Drawer = () => {
  const [opened, setOpen] = useState(false);
  const { tagsGroup } = useStaticQuery(graphql`
    {
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  const anime = useAnime();
  const draggableRef: React.RefObject<HTMLDivElement> = useRef(null);

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    },
    []
  );

  const drag = useCallback(
    (e: React.DragEvent) => {
      if (draggableRef?.current && e.pageY > 1e-5) {
        anime.set(draggableRef.current, {
          translateY: e.pageY - 20,
          translateX: e.pageX - 20,
        });
      }
    },
    [anime, draggableRef]
  );

  const dragEnd = useCallback(
    (e: React.DragEvent) => {
      anime({
        targets: draggableRef?.current,
        duration: 180,
        easing: "spring(1, 80, 12, 0)",
        translateX: 0,
        translateY: e.clientY,
      });
    },
    [anime, draggableRef]
  );

  const tags = useMemo(
    () =>
      tagsGroup?.group.map((i: any) => {
        return (
          <SkipIndexTag
            tag={i}
            count={i?.totalCount}
            key={i?.fieldValue.toString()}
          >
            <Link to={tagToPath(i.fieldValue)}>{i.fieldValue}</Link>
          </SkipIndexTag>
        );
      }),
    [tagsGroup]
  );

  return (
    <>
      <div>
        <div
          ref={draggableRef}
          className={clsx(
            classes.toggleWrapper,
            opened ? classes.toggleHidden : ""
          )}
          draggable
          onDragStart={dragStart}
          onDrag={drag}
          onDragEnd={dragEnd}
        >
          <button
            className={classes.toggleButton}
            onClick={function () {
              setOpen(true);
            }}
          >
            <ImageComponent
              path="doctor-strange-logo"
              className={classes.toggleImage}
            />
          </button>
        </div>
      </div>
      <MDrawer
        open={opened}
        classes={{ paper: classes.paper }}
        onClose={toggleDrawer(false)}
      >
        <List
          component="nav"
          aria-label="drawer"
          className={classes.drawerList}
        >
          <ListSubheader color="primary" className={classes.allTags}>
            All tags
          </ListSubheader>
          {tags}
        </List>
      </MDrawer>
    </>
  );
};

export default Drawer;

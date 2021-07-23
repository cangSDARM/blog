import { Drawer as MDrawer, List, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useRef, useState } from "react";
import ImageComponent from "../../image";
import useAnime from "../../useAnime";
import { SkipIndexTag, tagToPath } from "./indexing";

const useDrawerTheme = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#e8e8e8",
  },
  toggleWrapper: {
    zIndex: 111,
    position: "fixed",
    top: 0,
    left: 0,
    transform: "translate(0px, 140px)",
    display: "inline-flex",
    alignItems: "center",
    transition: "left .25s linear",
  },
  toggleButton: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    background: "transparent",
    border: "none",
    padding: 0,
    position: "relative",
    left: -8,
  },
  toggleImage: {
    height: 40,
    width: 40,
  },
  toggleHidden: {
    left: -40,
  },
  allTags: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
}));

const Drawer = () => {
  const [opend, setOpen] = useState(false);
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
  const classes = useDrawerTheme();
  const anime = useAnime();
  const draggableRef = useRef();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <div>
        <div
          ref={draggableRef}
          className={clsx(
            classes.toggleWrapper,
            opend ? classes.toggleHidden : ""
          )}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
          }}
          onDrag={(e) => {
            if (draggableRef?.current && e.pageY > 1e-5) {
              anime.set(draggableRef.current, {
                translateY: e.pageY - 20,
                translateX: e.pageX - 20,
              });
            }
          }}
          onDragEnd={(e) => {
            anime({
              targets: draggableRef?.current,
              duration: 180,
              easing: "spring(1, 80, 12, 0)",
              translateX: 0,
              translateY: e.clientY,
            });
          }}
        >
          <button
            className={classes.toggleButton}
            onClick={() => {
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
        open={opend}
        classes={{ paper: classes.paper }}
        onClose={toggleDrawer(false)}
      >
        <List component="nav" aria-label="drawer">
          <ListSubheader color="primary" className={classes.allTags}>
            All tags
          </ListSubheader>
          {tagsGroup?.group.map((i) => {
            return (
              <SkipIndexTag
                tag={i}
                count={i?.totalCount}
                key={i?.fieldValue.toString()}
              >
                <Link to={tagToPath(i.fieldValue)}>{i.fieldValue}</Link>
              </SkipIndexTag>
            );
          })}
        </List>{" "}
      </MDrawer>
    </>
  );
};

export default Drawer;

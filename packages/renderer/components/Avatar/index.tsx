import * as RAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";

const Avatar: React.FC<{
  src?: string;
  children?: string;
  className?: string;
  appearance?: "circular";
}> = ({ src = "", children = src, className, appearance }) => (
  <RAvatar.Root
    className={clsx(
      styles["avatar-root"],
      className,
      appearance === "circular" && styles["circular"]
    )}
    role="img"
  >
    <RAvatar.Image
      className={styles["avatar-image"]}
      src={src}
      alt={children}
    />
    <RAvatar.Fallback className={styles["avatar-fallback"]} delayMs={400}>
      {children}
    </RAvatar.Fallback>
  </RAvatar.Root>
);

export default Avatar;

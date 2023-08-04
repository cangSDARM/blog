import { Root, Image, Fallback } from "@radix-ui/react-avatar";
import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";

const Avatar: React.FC<{
  src?: string;
  children?: string;
  className?: string;
  appearance?: "circular";
}> = ({ src = "", children = src, className, appearance }) => (
  <Root
    className={clsx(
      styles["avatar-root"],
      className,
      appearance === "circular" && styles["circular"]
    )}
    role="img"
  >
    <Image className={styles["avatar-image"]} src={src} alt={children} />
    <Fallback className={styles["avatar-fallback"]} delayMs={400}>
      {children}
    </Fallback>
  </Root>
);

export default Avatar;

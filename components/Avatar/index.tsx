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
      styles.AvatarRoot,
      className,
      appearance === "circular" && styles.Circular
    )}
  >
    <RAvatar.Image className={styles.AvatarImage} src={src} alt={children} />
    <RAvatar.Fallback className={styles.AvatarFallback} delayMs={400}>
      {children}
    </RAvatar.Fallback>
  </RAvatar.Root>
);

export default Avatar;

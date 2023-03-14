import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export function useSurfaceStyle() {
  return styles["surface"];
}

const Surface = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      appearance?: "primary" | "soft" | "minimum";
    }
  >
>(({ children, appearance = "primary", className, ...props }, forwardRef) => {
  return (
    <section
      className={clsx(
        styles["surface"],
        appearance === "soft" && styles["soft-surface"],
        appearance === "minimum" && styles["minimum-surface"],
        className
      )}
      {...props}
      ref={forwardRef}
    >
      {children}
    </section>
  );
});

Surface.displayName = "surface";

export default Surface;

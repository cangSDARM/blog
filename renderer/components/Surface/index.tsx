import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export function useSurfaceStyle() {
  return classes?.["surface"] || "";
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
        classes["surface"],
        appearance === "soft" && classes["soft-surface"],
        appearance === "minimum" && classes["minimum-surface"],
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

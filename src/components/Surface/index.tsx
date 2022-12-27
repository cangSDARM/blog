import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export function useSurfaceStyle() {
  return styles['surface']
}

const Surface = React.forwardRef<
  any,
  React.PropsWithChildren<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  >
>(({ children, className, ...props }, forwardRef) => {
  return (
    <section
      className={clsx(styles["surface"], className)}
      {...props}
      ref={forwardRef}
    >
      {children}
    </section>
  );
});

export default Surface;

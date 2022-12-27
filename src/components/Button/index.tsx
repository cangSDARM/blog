import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";

const Button = React.forwardRef<
  any,
  React.PropsWithChildren<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & { appearance?: "subtle" | "primary" | "transparent" }
  >
>(({ children, appearance, className, ...props }, ref) => {
  return (
    <button
      className={clsx(
        styles["btn"],
        appearance === "subtle" && styles["subtle"],
        appearance === "transparent" && styles["transparent"],
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;

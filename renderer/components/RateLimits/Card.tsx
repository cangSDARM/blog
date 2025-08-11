import clsx from "clsx";
import classes from "./style.module.scss";
import React from "react";

export const Card: React.FC<
  React.PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >
> = React.forwardRef(({ children, className }, ref) => {
  return (
    <div className={clsx(className, classes.card)} ref={ref}>
      {children}
    </div>
  );
});
Card.displayName = "card";

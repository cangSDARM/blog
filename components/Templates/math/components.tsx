import React from "react";
import classes from "./style.module.scss";

export const Figure: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = (props) => {
  return (
    <figure className={classes.figure} {...props}>
      <figcaption>{props.title}</figcaption>
    </figure>
  );
};

export const Selector: React.FC<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & { options: any[] }
> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((op, i) => {
        let opProps = op;
        if (typeof op === "number" || typeof op === "string") {
          opProps = { value: op, children: op };
        }

        return <option {...opProps} key={i}></option>;
      })}
    </select>
  );
};

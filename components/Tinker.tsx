import clsx from "clsx";
import React from "react";

type InputType<T extends React.HTMLInputTypeAttribute> = T extends "checkbox"
  ? boolean
  : T extends "number" | "range"
    ? number
    : string;

type LabelProps = Omit<
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >,
  "htmlFor"
>;

type TinkerProps<T extends React.HTMLInputTypeAttribute> = {
  label: string;
  type?: T;
  value?: InputType<T>;
  setValue: React.Dispatch<React.SetStateAction<InputType<T>>>;
  max?: number;
  min?: number;
} & LabelProps;

function Tinker<T extends React.HTMLInputTypeAttribute>({
  label,
  type,
  value,
  setValue,
  max,
  min,
  className = "flex-col",
  ...labelProps
}: TinkerProps<T>): React.ReactElement {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (type) {
        case "checkbox":
          setValue(e.target.checked as any);
          break;
        case "number":
        case "range":
          setValue(
            Math.min(
              Math.max(parseInt(e.target.value), min ?? -Infinity),
              max ?? Infinity
            ) as any
          );
          break;
        default:
          setValue(e.target.value as any);
      }
    },
    [setValue, type]
  );

  return (
    <label {...labelProps} className={clsx("flex", className)}>
      <span>
        {label}
        <sup>{value as any}</sup>
      </span>
      <input
        type={type}
        value={value as any}
        max={max}
        min={min}
        onChange={onChange}
      />
    </label>
  );
}

export default Tinker;

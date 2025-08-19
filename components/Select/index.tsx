import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";
import * as RadixSelect from "@radix-ui/react-select";
import {
  RxCaretRight,
  RxCheck,
  RxChevronDown,
  RxChevronUp,
} from "react-icons/rx";

const SelectItem: typeof RadixSelect.Item = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item className={styles.item} {...props} ref={forwardedRef}>
        <RadixSelect.ItemIndicator data-select-indicator>
          <RxCheck />
        </RadixSelect.ItemIndicator>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

type Exported = {
  Group: typeof RadixSelect.Group;
  Label: typeof RadixSelect.Label;
  Separator: typeof RadixSelect.Separator;
};

export type SelectItem = {
  value: string;
  label: React.ReactNode;
};

// @ts-ignore
const Select: React.FC<{
  placeholder?: string;
  items: SelectItem[];
  onValueChange?: (value: string) => void;
  value?: string;
  autoSelectFirst?: boolean;
  align?: RadixSelect.SelectContentProps["align"];
}> &
  Exported = ({
  value: pValue,
  align,
  autoSelectFirst,
  placeholder = "",
  onValueChange,
  items,
}) => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (autoSelectFirst) {
      const newValue = items[0]?.value || "";
      setValue(newValue);
    }
  }, [autoSelectFirst, items.length]);

  React.useEffect(() => {
    if (pValue !== value) {
      setValue(pValue ?? "");
    }
  }, [pValue]);

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onValueChange?.(v);
      }}
    >
      <RadixSelect.Trigger className={styles.trigger}>
        <RadixSelect.Value placeholder={placeholder}>{value}</RadixSelect.Value>
        <RadixSelect.Icon data-select-trigger-icon>
          <RxCaretRight />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={-4}
          align={align}
          className={styles.content}
        >
          <RadixSelect.ScrollUpButton className={styles["scroll-btn"]}>
            <RxChevronUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport data-select-viewport>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles["scroll-btn"]}>
            <RxChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
Select.displayName = "select";

Select.Group = RadixSelect.Group;
Select.Separator = RadixSelect.Separator;
Select.Label = RadixSelect.Label;

export default Select;

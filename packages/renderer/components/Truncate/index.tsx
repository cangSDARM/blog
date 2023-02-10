import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Surface from "@/components/Surface";
import styles from "./style.module.scss";
import clsx from "clsx";

const Truncate: React.FC<
  React.PropsWithChildren<
    {
      align?: "left" | "right" | "center";
      as?: string;
      maxLines?: number;
    } & any
  >
> = ({
  children,
  maxLines = 100,
  align = "left",
  as: As = "span",
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [truncateWidth, setTruncateWidth] = React.useState(0);
  const [isTextContent, setIsText] = React.useState(false);
  const handleTruncate = (ref: HTMLSpanElement | null) => {
    if (ref) {
      if (
        Array.from(ref.childNodes || []).every((node) =>
          [3, 8].includes(node.nodeType)
        )
      ) {
        // text node, let css handle this
        setIsText(true);
      } else {
        const rect = ref?.clientWidth;
        const pRect = ref?.parentElement?.clientWidth || 0;

        setTruncateWidth(rect - pRect);
      }
    }
  };

  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={100}>
      <Tooltip.Root
        open={open}
        onOpenChange={(open) => truncateWidth > 0 && setOpen(open)}
      >
        <Tooltip.Trigger asChild>
          {/** @ts-ignore */}
          <As
            style={{
              transform: `translateX(${
                align === "left"
                  ? truncateWidth
                  : align === "right"
                  ? -truncateWidth
                  : 0
              }px)`,
              WebkitLineClamp: maxLines,
              lineClamp: maxLines,
            }}
            className={clsx(isTextContent && styles["wrapper"])}
            ref={handleTruncate}
            {...props}
          >
            {children}
          </As>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>
            <Surface>{children}</Surface>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Truncate;

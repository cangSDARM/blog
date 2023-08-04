import React from "react";
import Clamp from "react-multiline-clamp";
import * as Tooltip from "@radix-ui/react-tooltip";
import Surface from "@/components/Surface";
import clsx from "clsx";
import classes from "./style.module.scss";

const Truncate: React.FC<
  React.PropsWithChildren<
    {
      as?: string;
      maxLines?: number;
      tooltipProps: React.ComponentPropsWithoutRef<typeof Surface>;
      portalContainInBody?: boolean;
    } & any
  >
> = ({
  children,
  maxLines = 100,
  as: As = "span",
  tooltipProps = {},
  portalContainInBody = false,
  ...restProps
}) => {
  const [open, setOpen] = React.useState(false);
  // TODO;
  const [truncated, setTruncated] = React.useState(false);
  const portalRef = React.useRef<HTMLElement | null>(null);

  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={100}>
      <Tooltip.Root open={open} onOpenChange={(open) => setOpen(open)}>
        <Tooltip.Trigger asChild>
          <As
            {...(restProps || {})}
            ref={(r: HTMLElement | null) => {
              if (r) {
                portalRef.current = r.parentNode as HTMLElement;
              }
            }}
          >
            <Clamp lines={maxLines} maxLines={maxLines} withTooltip={false}>
              {children}
            </Clamp>
          </As>
        </Tooltip.Trigger>
        <Tooltip.Portal
          container={portalContainInBody ? document.body : portalRef.current}
        >
          <Tooltip.Content>
            <Surface
              appearance="soft"
              style={{ padding: "2px 4px" }}
              {...tooltipProps}
            >
              {React.Children.map(children || [], (child) => {
                if (React.isValidElement<any>(child)) {
                  return React.cloneElement(child, {
                    className: clsx(
                      child?.props?.className,
                      classes["in-tooltip"]
                    ),
                    ["in-tooltip"]: "true",
                  });
                }
                // primitive type
                if (child) {
                  return (
                    <span
                      className={clsx(
                        child?.props?.className,
                        classes["in-tooltip"]
                      )}
                      in-tooltip="true"
                    >
                      {child}
                    </span>
                  );
                }
              })}
            </Surface>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Truncate;

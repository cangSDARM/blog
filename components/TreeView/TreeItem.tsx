import clsx from "clsx";
import React, { memo, useContext, useEffect, useState } from "react";
import { TreeIconContext, TreeSelectorContext } from "./context";
import IconContainer from "./Icon";
import Label from "./Label";
import classes from "./style.module.scss";

const IconNode: React.FC<{
  expandable: boolean;
  expandWidth: number | string;
  expanded: boolean;
}> = memo(({ expandable, expandWidth, expanded }) => {
  const context = useContext(TreeIconContext);
  return expandable ? (
    <IconContainer
      collapseIcon={context.collapseIcon}
      expandIcon={context.expandedIcon}
      expanded={!expanded}
      width={expandWidth}
    />
  ) : (
    <></>
    // <IconContainer
    //   collapseIcon={<></>}
    //   expandIcon={<></>}
    //   expanded={!expanded}
    //   width={expandWidth}
    // />
  );
});
IconNode.displayName = "IcoNode";

const TreeItem: React.FC<
  React.PropsWithChildren<{
    nodeId: string;
    expandWidth?: number | string;
    label: React.ReactNode | string;
    expandable: boolean;
    defaultExpanded: boolean;
    classesNames?: Partial<{ group: string; label: string; selected: string }>;
    onToggle?: () => void;
  }>
> = ({
  expandable = false,
  defaultExpanded = false,
  classesNames,
  nodeId = "",
  expandWidth = 10,
  label = "",
  children = null,
  onToggle = () => {},
}) => {
  const context = useContext(TreeSelectorContext);

  const [expan, setExpan] = useState(false);

  useEffect(() => {
    if (expan != defaultExpanded) setExpan(defaultExpanded);
  }, [defaultExpanded]);

  const itemNode = (
    <div
      className={clsx(
        classes["item"],
        classesNames?.label,
        context.selected.indexOf(nodeId) > -1 && [
          classes["selected"],
          classesNames?.selected,
        ]
      )}
      role="menuitem"
    >
      <IconNode
        expandWidth={expandWidth}
        expandable={expandable}
        expanded={expan}
      />
      <Label>{label}</Label>
    </div>
  );

  const expandableNode = (
    <details
      open={expan}
      onToggle={(e) => {
        const target = e.currentTarget as HTMLDetailsElement;
        if (target) {
          setExpan(target.open);
          onToggle();
        }
      }}
      className={classes["item-details"]}
      role="menu"
    >
      <summary>{itemNode}</summary>
      {expan && (
        <div
          aria-hidden={!expan}
          className={clsx(expandable && classesNames?.group)}
        >
          {children}
        </div>
      )}
    </details>
  );

  return <>{expandable ? expandableNode : itemNode}</>;
};

export default TreeItem;

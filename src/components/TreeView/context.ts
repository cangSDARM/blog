import { createContext, ReactNode } from "react";

export const TreeSelectorContext = createContext<{
  selected: string[];
}>({
  selected: [],
});

export const TreeIconContext = createContext<{
  expandedIcon: ReactNode;
  collapseIcon: ReactNode;
}>({
  expandedIcon: null,
  collapseIcon: null,
});

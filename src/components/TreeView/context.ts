import { createContext } from "react";

const TreeViewContext = createContext<{
  expandedIcon: any;
  collapseIcon: any;
  selected: string[];
}>({
  expandedIcon: null,
  collapseIcon: null,
  selected: [],
});

export default TreeViewContext;

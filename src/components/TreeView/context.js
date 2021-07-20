import { createContext } from "react";

const TreeViewContext = createContext({
  expandedIcon: null,
  collapseIcon: null,
  selected: [],
});

export default TreeViewContext;

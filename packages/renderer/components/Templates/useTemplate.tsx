import React from "react";
import Archive from "./archive";
import Graphics from "./graphics";
import Haskell from "./haskell";
import Math from "./math";
import Network from "./network";

const useTemplateRender = (
  collection: string
): [Renderer: React.FC<TemplateProps>, rootStyle?: string] => {
  switch (collection) {
    case "archive":
      return [Archive];
    case "math":
      return [Math];
    case "network":
      return [Network];
    case "haskell":
      return [Haskell];
    case "graphics":
      return [Graphics, Graphics.rootStyle];
    default:
      console.warn('unknown collection "%s" for render', collection);
      return [({ children }) => children({})];
  }
};

export default useTemplateRender;

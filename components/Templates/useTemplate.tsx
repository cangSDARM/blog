import React from "react";
import Archive from "./archive";

const useTemplateRender = (collection: string): [React.FC<TemplateProps>] => {
  switch (collection) {
    case "archive":
      return [Archive];
    default:
      console.warn('unknown collection "%s" for render', collection);
      return [() => <></>];
  }
};

export default useTemplateRender;

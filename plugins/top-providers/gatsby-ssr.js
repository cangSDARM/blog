import * as React from "react";
import Providers from "./Providers";

export const wrapRootElement = ({ element }) => {
  return <Providers>{element}</Providers>;
};

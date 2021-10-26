import React, { memo } from "react";
import AppBar from "./appbar";

const Header: React.FC<
  {
    siteTitle: string;
    wrapper?: string;
  } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ siteTitle = "", ...otherProps }) => {
  const { children, wrapper, ...props } = otherProps;

  return (
    <AppBar siteTitle={siteTitle} wrapper={wrapper} {...props}>
      {children}
    </AppBar>
  );
};

export default memo(Header);

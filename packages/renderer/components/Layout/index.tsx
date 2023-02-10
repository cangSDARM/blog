import React from "react";
import { LCProvider } from "./context";
import Header from "./header";

const HeaderHeight = 80;

const Layout: React.FC<
  React.PropsWithChildren<{
    theme?: "dark" | "light";
  }>
> = ({ children, theme = "dark" }) => {
  return (
    <>
      <header style={{ height: HeaderHeight, position: "relative" }}>
        <Header imgSrc="" />
      </header>
      <main
        style={{
          backgroundColor:
            theme === "dark"
              ? "var(--colorNeutralBackground1)"
              : "var(--colorNeutralBackgroundInverted)",
          overflowX: "hidden",
          overflowY: "auto",
          width: "100vw",
          height: `calc(100vh - ${HeaderHeight}px)`,
        }}
      >
        {children}
      </main>
    </>
  );
};

export function injectLayoutContext<CompProp>(
  Comp: (prop: CompProp) => React.ReactElement | null
) {
  const RetComp = ({ overview, ...rest }: { overview: any } & CompProp) => (
    <LCProvider overview={overview}>
      {/** @ts-ignore */}
      <Comp {...rest} />
    </LCProvider>
  );

  RetComp.displayName = "InjectedComponent";
  return RetComp;
}

export default Layout;

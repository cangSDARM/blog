import React from "react";

const LayoutContext = React.createContext<{ overview: any[] }>({
  overview: [],
});

export const LCProvider: React.FC<
  React.PropsWithChildren<{
    overview: any;
  }>
> = ({ overview, children }) => {
  return (
    <LayoutContext.Provider value={{ overview }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLC = () => {
  return React.useContext(LayoutContext);
};

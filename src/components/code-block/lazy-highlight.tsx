import React from "react";

const LazyHighlight = async () => {
  const Module = await import(`prism-react-renderer`);
  const Highlight = Module.default;
  const defaultProps = Module.defaultProps;
  return (props: any) => <Highlight {...defaultProps} {...props} />;
};

export default LazyHighlight;

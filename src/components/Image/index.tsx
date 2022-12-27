import React from "react";

const Image = React.forwardRef<
  any,
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
>((props, ref) => {
  return (
    <picture ref={ref}>
      <img {...props} />
    </picture>
  );
});

export default Image;

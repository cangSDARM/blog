import Conf from "@/conf";
import NextImage from "next/image";
import React from "react";

const Image: React.FC<{
  src: string;
  ext?: string;
  width?: number;
  height?: number;
  alt?: string;
  style?: React.CSSProperties;
}> = ({ src, ext, style, alt = src, width = 3600, height = 3600 }) => {
  const tSrc = `${Conf.site.baseUrl + src}${ext ? "." + ext : ""}`;
  const [nSize, setNSize] = React.useState([width, height]);

  return (
    <NextImage
      onError={(err) => console.warn("image error: ", err)}
      onLoad={(e) => {
        const target = e.currentTarget;
        setNSize([target.naturalWidth, target.naturalHeight]);
      }}
      style={style}
      src={tSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={`(max-width: ${nSize[0]}px) 100vw, ${nSize[0]}px`}
      crossOrigin="anonymous"
    />
  );
};

export default Image;

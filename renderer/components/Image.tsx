import Conf from "@/conf";
import NextImage from "next/image";
import React from "react";

const Image: React.FC<{
  src: string;
  ext?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  alt?: string;
}> & { Static: typeof NextImage } = ({
  src,
  ext,
  style,
  width = 3000,
  height = 3000,
  ...props
}) => {
  const tSrc = React.useMemo(() => {
    if (src.startsWith("http")) return src;

    return `${Conf.site.baseUrl + src}${ext ? "." + ext : ""}`;
  }, [src, ext]);

  return (
    <NextImage
      style={style}
      src={tSrc}
      width={width}
      height={height}
      crossOrigin="anonymous"
      alt={props.alt || tSrc}
      {...props}
    />
  );
};

Image.Static = NextImage;

export default Image;

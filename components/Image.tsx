import Conf from "@/conf";
import NextImage from "next/image";
import React from "react";

const Image: React.FC<{
  src: string;
  ext?: string;
  width?: number;
  height?: number;
}> = ({ src, ext = "png", width = 3600, height = 3600 }) => {
  const tSrc = Conf.site.baseUrl + src + "." + ext;

  return <NextImage src={tSrc} alt={src} width={width} height={height} />;
};

export default Image;

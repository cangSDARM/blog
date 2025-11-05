import Conf from "@/conf";
import NextImage from "next/image";
import React from "react";

// @ts-ignore: static defined later
const Image: { Static: typeof NextImage } & React.ForwardRefExoticComponent<
  Omit<React.ComponentProps<typeof NextImage>, "alt"> & {
    src: string;
    ext?: string;
    alt?: string;
  }
> = React.forwardRef(
  ({ src, ext, width = 3000, height = 3000, ...props }, ref) => {
    const tSrc = React.useMemo(() => {
      if (src.startsWith("http")) return src;

      return `${Conf.site.baseUrl + src}${ext ? "." + ext : ""}`;
    }, [src, ext]);

    return (
      <NextImage
        src={tSrc}
        width={width}
        height={height}
        crossOrigin="anonymous"
        {...props}
        ref={ref}
        alt={props.alt || tSrc}
      />
    );
  }
);

Image.displayName = 'Image';
Image.Static = NextImage;

export default Image;

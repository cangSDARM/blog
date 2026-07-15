import Layout, { injectLayoutContext } from "@/components/Layout";
import Meta from "@/components/Meta";
import { collectionOverview } from "@/lib/api";
import Link from "next/link";
import React from "react";

const MAXIMUM_WIDTH = 300;
const MAXIMUM_HEIGHT = 300;
const grayRamp = "$@B%8&WM#*0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const rampLength = grayRamp.length;

const getFontRatio = () => {
  const pre = document.createElement("pre");
  pre.style.display = "inline";
  pre.textContent = " ";

  document.body.appendChild(pre);
  const { width, height } = pre.getBoundingClientRect();
  document.body.removeChild(pre);

  return height / width;
};

const toGrayScale = (r: number, g: number, b: number) =>
  0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const imageData = context.getImageData(0, 0, width, height);

  const grayScales = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] =
      imageData.data[i + 1] =
      imageData.data[i + 2] =
        grayScale;

    grayScales.push(grayScale);
  }

  context.putImageData(imageData, 0, 0);

  return grayScales;
};

const clampDimensions = (width: number, height: number) => {
  const rectifiedWidth = Math.floor(getFontRatio() * width);

  if (height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor((rectifiedWidth * MAXIMUM_HEIGHT) / height);
    return [reducedWidth, MAXIMUM_HEIGHT];
  }

  if (width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / rectifiedWidth);
    return [MAXIMUM_WIDTH, reducedHeight];
  }

  return [rectifiedWidth, height];
};

const getCharacterForGrayScale = (grayScale: number) =>
  grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

const drawAscii = (grayScales: number[], width: number) => {
  const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
    let nextChars = getCharacterForGrayScale(grayScale);
    if ((index + 1) % width === 0) {
      nextChars += "\n";
    }

    return asciiImage + nextChars;
  }, "");

  return ascii;
};

const AsciiArt: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = React.useState("");

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!canvasRef.current) return;
      if (!event.target?.result) return;

      const image = new Image();
      image.onload = () => {
        const [width, height] = clampDimensions(image.width, image.height);

        canvasRef.current!.width = width;
        canvasRef.current!.height = height;

        const context = canvasRef.current!.getContext("2d");
        context!.drawImage(image, 0, 0, width, height);
        const grayScales = convertToGrayScales(context!, width, height);

        setAscii(drawAscii(grayScales, width));
      };

      image.src = event.target.result?.toString() ?? "";
    };

    if (!file) return;
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Meta />
      <Layout theme="light">
        <div className="flex flex-col justify-center items-center h-full">
          <div>
            <label>
              Reference:&nbsp;&nbsp;
              <Link
                href="https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art/"
                target="__blank"
              >
                https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art/
              </Link>
            </label>
            <ul>
              TODO:
              <li>1. Properly scale the pre size</li>
            </ul>
          </div>

          <input type="file" onChange={onFileChange} accept="image/*" />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <pre style={{ fontSize: 4, lineHeight: 1 }}>{ascii}</pre>
        </div>
      </Layout>
    </>
  );
};

export default injectLayoutContext(AsciiArt);

export function getStaticProps() {
  const overview = collectionOverview();

  return {
    props: { overview },
  };
}

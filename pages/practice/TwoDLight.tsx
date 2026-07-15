import React from "react";
import Layout, { injectLayoutContext } from "@/components/Layout";
import Meta from "@/components/Meta";
import Tinker from "@/components/Tinker";
import { collectionOverview } from "@/lib/api";
import { vec3 } from "wgpu-matrix";

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 5
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * make css hsl string from normalized inputs
 * @param h hue 0 to 1
 * @param s saturation 0 to 1
 * @param l luminance 0 to 1
 * @returns css hsl() string
 */
const hsl = (h: number, s: number, l: number) =>
  `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`;

function arrowHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rot: number,
  size: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-5, -2);
  ctx.lineTo(0, 10);
  ctx.lineTo(5, -2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  start: boolean,
  end: boolean,
  size = 1
) {
  const rot = -Math.atan2(x1 - x2, y1 - y2);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  if (start) {
    arrowHead(ctx, x1, y1, rot, size);
  }
  if (end) {
    arrowHead(ctx, x2, y2, rot + Math.PI, size);
  }
}

/**
 * copy paste from https://github.com/webgpu/webgpufundamentals/blob/87b9dd3b4ad1d07c6c08d268e71a245899337cf5/3rdparty/twgl-full.module.js#L10087-L10106
 * Resize a canvas to match the size it's displayed.
 * @param canvas The canvas to resize.
 * @param multiplier So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return true if the canvas was resized.
 */
function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  multiplier: number
): boolean {
  multiplier = multiplier || 1;
  multiplier = Math.max(0, multiplier);
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function createRenderer(ctx: CanvasRenderingContext2D) {
  const lang = {
    lightDir: "light direction",
    dot: "dot(lightDirection,surfaceDirection) = ",
    surface1: "surface",
    surface2: "direction",
  };

  const darkColors = {
    arrow: "#DDD",
    surfaceDir: "#0C0",
  };
  const lightColors = {
    arrow: "#000",
    surfaceDir: "#080",
  };

  const darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");

  function render(settings: { direction: number }) {
    const { direction } = settings;
    const isDarkMode = darkMatcher.matches;
    const colors = isDarkMode ? darkColors : lightColors;

    resizeCanvasToDisplaySize(ctx.canvas, window.devicePixelRatio);
    const width = 250;
    const height = 200;

    const baseScale = Math.min(
      ctx.canvas.width / width,
      ctx.canvas.height / height
    );

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.scale(baseScale, baseScale);

    ctx.font = "8px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lx = 0;
    const ly = -height / 5;

    ctx.save();
    ctx.translate(lx, ly);

    ctx.fillStyle = colors.arrow;
    ctx.strokeStyle = colors.arrow;
    const numArrows = 5;
    for (let ii = 0; ii <= numArrows; ++ii) {
      const u = ii / numArrows;
      const x = (u * 2 - 1) * 70;
      ctx.save();
      ctx.translate(x, 0);
      ctx.rotate(direction);
      arrow(ctx, 0, -20, 0, 20, false, true, 0.5);
      ctx.restore();
    }
    ctx.fillText(lang.lightDir, 0, -30);

    ctx.restore();

    const sx = 0;
    const sy = height / 6 + 10;

    ctx.save();
    ctx.translate(sx, sy);

    // draw surface
    roundedRect(ctx, -100, 0, 200, 20);
    const d = vec3.dot(
      [0, 1, 0],
      [Math.sin(direction), Math.cos(direction), 0]
    );
    ctx.fillStyle = hsl(0, 1, d - 0.5);
    ctx.fill();
    ctx.strokeStyle = `rgb(0, 0, 0)`;
    ctx.stroke();

    ctx.fillStyle = "#FFF";
    ctx.fillText(lang.dot + -d.toFixed(2), 0, 10);

    const nx = 0;
    const ny = -20;
    ctx.fillStyle = colors.surfaceDir;
    ctx.strokeStyle = colors.surfaceDir;
    arrow(ctx, 0, 0, nx, ny, false, true);
    ctx.fillText(lang.surface1, nx, ny - 22);
    ctx.fillText(lang.surface2, nx, ny - 14);

    ctx.restore();

    ctx.restore();
  }

  return render;
}

const TwoDLight: React.FC = () => {
  const [direction, setDirection] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !ctx) return;

    const render = createRenderer(ctx);
    render({ direction: (direction / 180) * Math.PI });
  }, [canvasRef.current, direction]);

  return (
    <>
      <Meta />
      <Layout theme="light">
        <div className="flex flex-col justify-center items-center h-full">
          <ul>
            TODO:
            <li>1. shadow</li>
            <li>2. true light</li>
          </ul>
          <Tinker
            label="direction"
            value={direction}
            setValue={setDirection}
            type="range"
            max={180}
            min={-180}
            className="flex-row"
            style={{
              gap: "1em",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{ height: 400, width: 600, background: "#333" }}
          />
        </div>
      </Layout>
    </>
  );
};

export default injectLayoutContext(TwoDLight);

export function getStaticProps() {
  const overview = collectionOverview();

  return {
    props: { overview },
  };
}

import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import { clamp, random } from "lodash";
import Link from "next/link";
import React from "react";

// Size of canvas. These get updated to fill the whole browser.
let width = 150;
let height = 150;
let rAF = -1;

type Boid = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  history: [number, number][];
  color: string;
};

const boids: Boid[] = [];

function color(r: number, g: number, b: number) {
  return "#" + ((r << 16) | (g << 8) | b).toString(16);
}

function distance(boid1: Boid, boid2: Boid) {
  return Math.sqrt(
    (boid1.x - boid2.x) * (boid1.x - boid2.x) +
      (boid1.y - boid2.y) * (boid1.y - boid2.y)
  );
}

// TODO: This is naive and inefficient.
function nClosestBoids(boid: Boid, n: number) {
  // Make a copy
  const sorted = boids.slice();
  // Sort the copy by distance from `boid`
  sorted.sort((a, b) => distance(boid, a) - distance(boid, b));
  // Return the `n` closest
  return sorted.slice(1, n + 1);
}

// Constrain a boid to within the window. If it gets too close to an edge,
// nudge it back in and reverse its direction.
function keepWithinBounds(boid: Boid) {
  const margin = 200;
  const turnFactor = 1;

  if (boid.x < margin) {
    boid.dx += turnFactor;
  }
  if (boid.x > width - margin) {
    boid.dx -= turnFactor;
  }
  if (boid.y < margin) {
    boid.dy += turnFactor;
  }
  if (boid.y > height - margin) {
    boid.dy -= turnFactor;
  }
}

function drawBoid(
  ctx: CanvasRenderingContext2D,
  boid: Boid,
  { drawTrail = false }
) {
  const angle = Math.atan2(boid.dy, boid.dx);
  ctx.translate(boid.x, boid.y);
  ctx.rotate(angle);
  ctx.translate(-boid.x, -boid.y);
  ctx.fillStyle = boid.color;
  ctx.beginPath();
  ctx.moveTo(boid.x, boid.y);
  ctx.lineTo(boid.x - 15, boid.y + 5);
  ctx.lineTo(boid.x - 15, boid.y - 5);
  ctx.lineTo(boid.x, boid.y);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (drawTrail) {
    ctx.strokeStyle = boid.color + "66";
    ctx.beginPath();
    ctx.moveTo(boid.history[0][0], boid.history[0][1]);
    for (const point of boid.history) {
      ctx.lineTo(point[0], point[1]);
    }
    ctx.stroke();
  }
}

function Tinker<
  T extends React.HTMLInputTypeAttribute,
  S = T extends "checkbox"
    ? boolean
    : T extends "number" | "range"
      ? number
      : string,
>({
  label,
  type,
  value,
  setValue,
  max,
  min,
}: {
  label: string;
  type?: T;
  value?: S;
  setValue: React.Dispatch<React.SetStateAction<S>>;
  max?: number;
  min?: number;
}): React.ReactElement {
  return (
    <label style={{ display: "flex", flexDirection: "column" }}>
      <span>
        {label}
        <sup>{value as any}</sup>
      </span>
      <input
        type={type}
        value={value as any}
        max={max}
        min={min}
        onChange={(e) => {
          switch (type) {
            case "checkbox":
              setValue(e.target.checked as any);
              break;
            case "number":
            case "range":
              setValue(
                Math.min(
                  Math.max(parseInt(e.target.value), min ?? -Infinity),
                  max ?? Infinity
                ) as any
              );
              break;
            default:
              setValue(e.target.value as any);
          }
        }}
      />
    </label>
  );
}

const Boids: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [size, setSize] = React.useState(100);
  const [drawTrail, setDrawTrail] = React.useState(false);
  const [colorful, setColorful] = React.useState(false);
  const [visualRange, setVisualRange] = React.useState(75);
  const [speedLimit, setSpeedLimit] = React.useState(15);
  const [separation, setSeparation] = React.useState(5);
  const [coherence, setCoherence] = React.useState(20);
  const [alignment, setAlignment] = React.useState(5);

  // Called initially and whenever the window resizes to update the canvas
  // size and width/height variables.
  const sizeCanvas = () => {
    if (!canvasRef.current) return;
    width = Math.max(window.innerWidth - 10, 300);
    height = Math.min(width * 0.75, window.innerHeight - 300); // 4:3
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  };

  const init = () => {
    // prepare canvas
    sizeCanvas();
    canvasRef.current
      ?.getContext("2d")
      ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // Randomly distribute the boids to start
    for (var i = 0; i < size; i += 1) {
      const c = colorful
        ? color(
            random(0, 255, false),
            random(0, 255, false),
            random(0, 255, false)
          )
        : color(85, 140, 244);
      boids[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * 10 - 5,
        history: [],
        color: c,
      };
    }
    initAnimation();
  };

  const initAnimation = () => {
    window.cancelAnimationFrame(rAF);
    // Schedule the main animation loop
    rAF = window.requestAnimationFrame(animationLoop);
  };

  // Find the center of mass of the other boids and adjust velocity slightly to
  // point towards the center of mass.
  const flyTowardsCenter = (boid: Boid) => {
    const centeringFactor = alignment * 0.001; // adjust velocity by this %

    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
      if (distance(boid, otherBoid) < visualRange) {
        centerX += otherBoid.x;
        centerY += otherBoid.y;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      centerX = centerX / numNeighbors;
      centerY = centerY / numNeighbors;

      boid.dx += (centerX - boid.x) * centeringFactor;
      boid.dy += (centerY - boid.y) * centeringFactor;
    }
  };

  // Find the average velocity (speed and direction) of the other boids and
  // adjust velocity slightly to match.
  const matchVelocity = (boid: Boid) => {
    const matchingFactor = 0.05; // Adjust by this % of average velocity

    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
      if (distance(boid, otherBoid) < visualRange) {
        avgDX += otherBoid.dx;
        avgDY += otherBoid.dy;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      avgDX = avgDX / numNeighbors;
      avgDY = avgDY / numNeighbors;

      boid.dx += (avgDX - boid.dx) * matchingFactor;
      boid.dy += (avgDY - boid.dy) * matchingFactor;
    }
  };

  // Speed will naturally vary in flocking behavior, but real animals can't go
  // arbitrarily fast.
  const limitSpeed = (boid: Boid) => {
    const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
    if (speed > speedLimit) {
      boid.dx = (boid.dx / speed) * speedLimit;
      boid.dy = (boid.dy / speed) * speedLimit;
    }
  };

  // Move away from other boids that are too close to avoid colliding
  const avoidOthers = (boid: Boid) => {
    const minDistance = coherence; // The distance to stay away from other boids
    const avoidFactor = separation * 0.01; // Adjust velocity by this %
    let moveX = 0;
    let moveY = 0;
    for (let otherBoid of boids) {
      if (otherBoid !== boid) {
        if (distance(boid, otherBoid) < minDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      }
    }

    boid.dx += moveX * avoidFactor;
    boid.dy += moveY * avoidFactor;
  };

  // Main animation loop
  const animationLoop = () => {
    if (!canvasRef.current) return;

    // Update each boid
    for (let boid of boids) {
      // Update the velocities according to each rule
      flyTowardsCenter(boid);
      avoidOthers(boid);
      matchVelocity(boid);
      limitSpeed(boid);
      keepWithinBounds(boid);

      // Update the position based on the current velocity
      boid.x += boid.dx;
      boid.y += boid.dy;
      boid.history.push([boid.x, boid.y]);
      boid.history = boid.history.slice(-80);
    }

    // Clear the canvas and redraw all the boids in their current positions
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, width, height);
    for (let boid of boids) {
      drawBoid(ctx, boid, { drawTrail });
    }

    // Schedule the next frame
    rAF = window.requestAnimationFrame(animationLoop);
  };

  React.useLayoutEffect(() => {
    window.addEventListener("resize", sizeCanvas, false);

    return () => window.removeEventListener("resize", sizeCanvas, false);
  }, [canvasRef.current]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    init();
  }, [canvasRef.current, size, colorful]);

  React.useEffect(() => {
    initAnimation();
  }, [drawTrail, visualRange, speedLimit, separation, coherence, alignment]);

  return (
    <>
      <Meta />
      <Layout theme="light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div>
            <label>
              Reference:&nbsp;&nbsp;
              <Link href="https://eater.net/boids" target="__blank">
                https://eater.net/boids
              </Link>
            </label>
            <ul>
              TODO:
              <li>
                1. Add a strong wind or current to see what effect it has on the
                flock.
              </li>
              <li>
                2. Add &quot;perching&quot; behavior. If a boid gets close to
                the bottom of the screen, have it land and hang out on the
                ground for a bit before taking off again and rejoining the
                flock.
              </li>
              <li>3. Make it 3D</li>
            </ul>
          </div>

          <h3>Options</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1em",
            }}
          >
            <Tinker
              label="Size of boids"
              value={size}
              type="number"
              max={600}
              min={10}
              setValue={setSize}
            />
            <Tinker
              label="Speed Limit"
              value={speedLimit}
              setValue={setSpeedLimit}
              type="range"
              max={100}
              min={1}
            />
            <Tinker
              label="Visual Range"
              value={visualRange}
              setValue={setVisualRange}
              type="range"
              max={100}
              min={10}
            />
            <Tinker
              label="Separation"
              value={separation}
              setValue={setSeparation}
              type="range"
              max={50}
              min={5}
            />
            <Tinker
              label="Coherence"
              value={coherence}
              setValue={setCoherence}
              type="range"
              max={40}
              min={10}
            />
            <Tinker
              label="Alignment"
              value={alignment}
              setValue={setAlignment}
              type="range"
              max={50}
              min={1}
            />
            <Tinker
              label="Draw Trail"
              value={drawTrail}
              setValue={setDrawTrail}
              type="checkbox"
            />
            <Tinker
              label="Colorful"
              value={colorful}
              setValue={setColorful}
              type="checkbox"
            />
          </div>

          <canvas ref={canvasRef} />
        </div>
      </Layout>
    </>
  );
};

export default Boids;

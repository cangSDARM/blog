import React from "react";
import { Card } from "./Card";
import classes from "./style.module.scss";
import Button from "../Button";

interface Request {
  id: number;
  timestamp: number;
  status: "served" | "rejected";
  windowCount?: number;
}

// TODO: split logic&ui
const FixedWindowRateLimiter = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [windowLimit, setWindowLimit] = React.useState<number>(5);
  const [windowDuration, setWindowDuration] = React.useState<number>(3000); // Default to 1 second
  const [servedCount, setServedCount] = React.useState<number>(0);
  const [rejectedCount, setRejectedCount] = React.useState<number>(0);

  const intervalRef = React.useRef<NodeJS.Timeout>(
    null as unknown as NodeJS.Timeout
  );
  const requestIdRef = React.useRef(0);
  const startTimeRef = React.useRef<number>(Date.now());

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTimeRef.current);
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const getCurrentWindow = (time: number) => {
    return Math.floor(time / windowDuration);
  };

  const getRequestsInCurrentWindow = (time: number) => {
    const currentWindow = getCurrentWindow(time);
    const windowStart = currentWindow * windowDuration;
    const windowEnd = windowStart + windowDuration;

    return requests.filter(
      (req) =>
        req.timestamp >= windowStart &&
        req.timestamp < windowEnd &&
        req.status === "served"
    ).length;
  };

  const handleSendRequest = () => {
    const requestTime = currentTime;
    const requestsInWindow = getRequestsInCurrentWindow(requestTime);
    const shouldServe = requestsInWindow < windowLimit;

    const newRequest = {
      id: requestIdRef.current++,
      timestamp: requestTime,
      status: shouldServe ? "served" : "rejected",
      window: getCurrentWindow(requestTime),
    } as Request;

    setRequests((prev) => [...prev, newRequest]);

    if (shouldServe) {
      setServedCount((prev) => prev + 1);
    } else {
      setRejectedCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setRequests([]);
    setServedCount(0);
    setRejectedCount(0);
    startTimeRef.current = Date.now();
  };

  const handleToggleTimer = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - currentTime;
    }
    setIsRunning(!isRunning);
  };

  // Calculate display parameters
  const displayDuration = 5000; // Show 5 seconds
  const pixelsPerMs = 600 / displayDuration; // 600px width for time axis
  const currentWindowStart = getCurrentWindow(currentTime) * windowDuration;
  const timeOffset = Math.max(0, currentTime - displayDuration);

  // Filter visible requests
  const visibleRequests = requests.filter(
    (req) => req.timestamp >= timeOffset && req.timestamp <= currentTime + 500
  );

  return (
    <div className={classes.root}>
      <h3>Fixed Window Counter Rate Limiter</h3>

      {/* Configuration */}
      <Card className={classes.controls}>
        <div>
          <label>
            Window Limit (requests)
            <input
              type="number"
              value={windowLimit}
              onChange={(e) =>
                setWindowLimit(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              max="20"
            />
          </label>
          <sub>{windowLimit} requests per window</sub>
        </div>

        <div>
          <label>
            Window Duration (ms)
            <input
              type="number"
              value={windowDuration}
              onChange={(e) =>
                setWindowDuration(
                  Math.max(500, parseInt(e.target.value) || 1000)
                )
              }
              min="500"
              max="5000"
              step="100"
            />
          </label>
          <sub>{windowDuration} ms per window</sub>
        </div>

        {/* Controls */}
        <div>
          <Button onClick={handleToggleTimer}>
            {/* {isRunning ? <Pause size={20} /> : <Play size={20} />} */}
            {isRunning ? "Pause" : "Start"} Timer
          </Button>

          <Button onClick={handleSendRequest}>
            {/* <Send size={20} /> */}
            Send Request
          </Button>

          <Button onClick={handleReset}>
            {/* <RotateCcw size={20} /> */}
            Reset
          </Button>
        </div>
      </Card>

      {/* Timeline Visualization */}
      <Card className={classes.container}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Grid lines for time windows */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <pattern
                id="grid"
                width={windowDuration * pixelsPerMs}
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M ${windowDuration * pixelsPerMs} 0 L 0 0 0 20`}
                  fill="none"
                  stroke="#999"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Current time indicator */}
            <line
              x1={(currentTime - timeOffset) * pixelsPerMs}
              y1="0"
              x2={(currentTime - timeOffset) * pixelsPerMs}
              y2="100%"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Current window highlight */}
            <rect
              x={(currentWindowStart - timeOffset) * pixelsPerMs}
              y="0"
              width={windowDuration * pixelsPerMs}
              height="100%"
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
            />
          </svg>

          {/* Request blocks */}
          {visibleRequests.map((request) => {
            const x = (request.timestamp - timeOffset) * pixelsPerMs;
            const y = 50 + (request.timestamp % 200); // Stagger vertically
            const isServed = request.status === "served";

            return (
              <div
                key={request.id}
                className={classes.request}
                style={{
                  background: isServed ? "#ffa" : "#faa",
                  left: `${x - 16}px`,
                  top: `${Math.min(y, 250)}px`,
                  transform: `scale(${Math.max(0.5, 1 - (currentTime - request.timestamp) / 2000)})`,
                  opacity: Math.max(
                    0.3,
                    1 - (currentTime - request.timestamp) / 3000
                  ),
                }}
                title={`${isServed ? "Served" : "Rejected"} at ${request.timestamp}ms`}
              />
            );
          })}

          {/* Time labels */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {Array.from({ length: 6 }, (_, i) => {
              const time = timeOffset + (i * displayDuration) / 5;
              return <div key={i}>{(time / 1000).toFixed(1)}s</div>;
            })}
          </div>
        </div>

        {/* Legend */}

        <div>
          <h4>Request Status:</h4>
          <div style={{ background: "#ffa" }}>
            <span className="text-green-500">Served</span>
          </div>
          <div style={{ background: "#faa" }}>
            <span className="text-red-500">Rejected</span>
          </div>
          <div style={{ background: "#aafa" }}>
            <span className="text-purple-500">Current Window</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className={classes.stats}>
        <Card>
          <div>{servedCount}</div>
          <sub>Served</sub>
        </Card>
        <Card>
          <div>{rejectedCount}</div>
          <sub>Rejected</sub>
        </Card>
        <Card>
          <div>{getRequestsInCurrentWindow(currentTime)}</div>
          <sub>Current Window</sub>
        </Card>
      </div>
    </div>
  );
};

export default FixedWindowRateLimiter;

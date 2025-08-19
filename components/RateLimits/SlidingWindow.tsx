import Button from "@/components/Button";
import { Card } from "./Card";
import React from "react";
import classes from "./style.module.scss";

interface Request {
  id: number;
  timestamp: number;
  status: "served" | "rejected";
  windowCount?: number;
}

// TODO: split logic&ui
const SlidingWindowRateLimiter = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [windowLimit, setWindowLimit] = React.useState<number>(5);
  const [windowDuration, setWindowDuration] = React.useState<number>(3000);
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

  const getRequestsInSlidingWindow = (time: number) => {
    const windowStart = time - windowDuration;
    return requests.filter(
      (req) =>
        req.timestamp > windowStart &&
        req.timestamp <= time &&
        req.status === "served"
    ).length;
  };

  const handleSendRequest = () => {
    const requestTime = currentTime;
    const requestsInWindow = getRequestsInSlidingWindow(requestTime);
    const shouldServe = requestsInWindow < windowLimit;

    const newRequest = {
      id: requestIdRef.current++,
      timestamp: requestTime,
      status: shouldServe ? "served" : "rejected",
      windowCount: requestsInWindow, // Store count at the time of request
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
  const displayDuration = 6000; // Show 6 seconds
  const pixelsPerMs = 600 / displayDuration; // 600 px width for time axis
  const timeOffset = Math.max(0, currentTime - displayDuration);

  // Filter visible requests
  const visibleRequests = requests.filter(
    (req) => req.timestamp >= timeOffset && req.timestamp <= currentTime + 500
  );

  // Get requests currently in the sliding window
  const currentWindowRequests = requests.filter(
    (req) =>
      req.timestamp > currentTime - windowDuration &&
      req.timestamp <= currentTime &&
      req.status === "served"
  );

  return (
    <div className={classes.root}>
      <h3>Sliding Window Rate Limiter</h3>

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
                  Math.max(1000, parseInt(e.target.value) || 2000)
                )
              }
              min="1000"
              max="10000"
              step="500"
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
          {/* Background grid */}
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
                id="timeGrid"
                width="60"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 20"
                  fill="none"
                  stroke="#999"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#timeGrid)" />

            {/* Current time indicator */}
            <line
              x1={(currentTime - timeOffset) * pixelsPerMs}
              y1="0"
              x2={(currentTime - timeOffset) * pixelsPerMs}
              y2="300"
              stroke="#8b5cf6"
              strokeWidth="3"
            />

            {/* Sliding window range */}
            <rect
              x={Math.max(
                0,
                (currentTime - windowDuration - timeOffset) * pixelsPerMs
              )}
              y="0"
              width={windowDuration * pixelsPerMs}
              height="300"
              fill="rgba(139, 92, 246, 0.15)"
              stroke="rgba(139, 92, 246, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Window start line */}
            <line
              x1={Math.max(
                0,
                (currentTime - windowDuration - timeOffset) * pixelsPerMs
              )}
              y1="0"
              x2={Math.max(
                0,
                (currentTime - windowDuration - timeOffset) * pixelsPerMs
              )}
              y2="300"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          </svg>

          {/* Request blocks */}
          {visibleRequests.map((request) => {
            const x = (request.timestamp - timeOffset) * pixelsPerMs;
            const y = 50 + (request.timestamp % 180); // Stagger vertically
            const isServed = request.status === "served";
            const isInCurrentWindow =
              request.timestamp > currentTime - windowDuration &&
              request.timestamp <= currentTime;

            return (
              <div
                key={request.id}
                className={classes.request}
                style={{
                  background: isServed ? "#ffa" : "#faa",
                  left: `${x - 16}px`,
                  top: `${Math.min(y, 250)}px`,
                  transform: `scale(${isInCurrentWindow ? 1 : 0.7})`,
                  opacity: isInCurrentWindow ? 1 : 0.5,
                  zIndex: isInCurrentWindow ? 10 : 5,
                }}
                title={`${isServed ? "Served" : "Rejected"} at ${request.timestamp}ms${isInCurrentWindow ? " (In Window)" : ""}`}
              >
                {/* Highlight requests in the current window */}
                {isInCurrentWindow && isServed && (
                  <div
                    style={{
                      position: "absolute",
                      inset: -1,
                      border: "4px solid purple",
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Window edge labels */}
          <div
            style={{ position: "absolute", top: "2em", left: 0, right: 0 }}
            className="absolute top-2 left-0 right-0"
          >
            <div
              style={{
                position: "absolute",
                color: "purple",
                background: "white",
                left: `${Math.max(10, (currentTime - windowDuration - timeOffset) * pixelsPerMs)}px`,
                transform: "translateX(-50%)",
              }}
            >
              Window Start
            </div>
            <div
              style={{
                position: "absolute",
                color: "purple",
                background: "white",
                top: "2em",
                left: `${(currentTime - timeOffset) * pixelsPerMs}px`,
                transform: "translateX(-50%)",
              }}
            >
              Now
            </div>
          </div>

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
            {Array.from({ length: 7 }, (_, i) => {
              const time = timeOffset + (i * displayDuration) / 6;
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
          <div>{getRequestsInSlidingWindow(currentTime)}</div>
          <sub>In Sliding Window</sub>
        </Card>
      </div>
    </div>
  );
};

export default SlidingWindowRateLimiter;

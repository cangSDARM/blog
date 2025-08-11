import Button from "@/components/Button";
import React from "react";
import classes from "./style.module.scss";
import { Card } from "./Card";

interface Request {
  id: number;
  timestamp: number;
  processTime: number;
  dropTime: number;
}

const RequestStatusIndicators = {
  MovingToBucket: "#afa",
  AcceptedProcessed: "#aff",
  Dropped: "#faa",
};

// TODO: split logic&ui
const LeakyBucketSimulator: React.FC = () => {
  const [bucketSize, setBucketSize] = React.useState<number>(10);
  const [fillRate, setFillRate] = React.useState<number>(1); // requests per second
  const [bucket, setBucket] = React.useState<Request[]>([]);
  const [isRunning, setIsRunning] = React.useState<boolean>(true);
  const [stats, setStats] = React.useState({
    totalRequests: 0,
    processedRequests: 0,
    droppedRequests: 0,
    currentBucketSize: 0,
  });
  const [animatingRequests, setAnimatingRequests] = React.useState<Request[]>(
    []
  );
  const [processingRequests, setProcessingRequests] = React.useState<Request[]>(
    []
  );
  const [droppedRequests, setDroppedRequests] = React.useState<Request[]>([]);

  const intervalRef = React.useRef<NodeJS.Timeout>(
    null as unknown as NodeJS.Timeout
  );
  const requestIdRef = React.useRef<0>(0);

  // Leaky bucket processing
  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setBucket((prev) => {
          const newBucket = [...prev];
          const processCount = Math.min(fillRate, newBucket.length);

          // Process requests (leak from bucket)
          const processed = newBucket.splice(0, processCount);

          if (processed.length > 0) {
            setProcessingRequests((prev) => [
              ...prev,
              ...processed.map((req: Request) => ({
                ...req,
                processTime: Date.now(),
              })),
            ]);

            setStats((prev) => ({
              ...prev,
              processedRequests: prev.processedRequests + processed.length,
              currentBucketSize: newBucket.length,
            }));
          }

          return newBucket;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, fillRate]);

  // Animation cleanup
  React.useEffect(() => {
    const cleanup = setInterval(() => {
      setAnimatingRequests((prev) =>
        prev.filter((req: Request) => Date.now() - req.timestamp < 2000)
      );
      setProcessingRequests((prev) =>
        prev.filter((req: Request) => Date.now() - req.processTime < 2000)
      );
      setDroppedRequests((prev) =>
        prev.filter((req: Request) => Date.now() - req.dropTime < 2000)
      );
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const sendRequest = () => {
    const requestId = requestIdRef.current++;
    const newRequest: Request = {
      id: requestId,
      timestamp: Date.now(),
      processTime: 0,
      dropTime: 0,
    };

    // Add to animation queue
    setAnimatingRequests((prev) => [...prev, newRequest]);

    // Simulate request reaching bucket after animation
    setTimeout(() => {
      setBucket((prev) => {
        if (prev.length < bucketSize) {
          // Request accepted
          const updatedBucket = [...prev, newRequest];
          setStats((prevStats) => ({
            ...prevStats,
            totalRequests: prevStats.totalRequests + 1,
            currentBucketSize: updatedBucket.length,
          }));
          return updatedBucket;
        } else {
          // Request dropped - add to dropped animation
          setDroppedRequests((prevDropped) => [
            ...prevDropped,
            {
              ...newRequest,
              dropTime: Date.now(),
            },
          ]);
          setStats((prevStats) => ({
            ...prevStats,
            totalRequests: prevStats.totalRequests + 1,
            droppedRequests: prevStats.droppedRequests + 1,
          }));
          return prev;
        }
      });
    }, 1000);
  };

  const reset = () => {
    setIsRunning(false);
    setBucket([]);
    setAnimatingRequests([]);
    setProcessingRequests([]);
    setDroppedRequests([]);
    setStats({
      totalRequests: 0,
      processedRequests: 0,
      droppedRequests: 0,
      currentBucketSize: 0,
    });
    requestIdRef.current = 0;
  };

  const bucketFillPercentage = (bucket.length / bucketSize) * 100;

  return (
    <div className={classes.root}>
      <h3>Leaky Bucket Rate Limiting Simulator</h3>

      {/* Controls */}
      <Card className={classes.controls}>
        <div>
          <label>
            Bucket Size
            <input
              type="number"
              min="1"
              max="20"
              value={bucketSize}
              onChange={(e) => setBucketSize(parseInt(e.target.value))}
            />
          </label>
          <sub>{bucketSize} tokens</sub>
        </div>

        <div>
          <label>
            Fill Rate (req/sec)
            <input
              type="number"
              min="1"
              max="10"
              value={fillRate}
              onChange={(e) => setFillRate(parseInt(e.target.value))}
            />
          </label>
          <sub>{fillRate}/second</sub>
        </div>

        <div>
          <Button onClick={sendRequest}>
            {/* <Send size={20} /> */}
            Send Request
          </Button>

          <Button onClick={() => setIsRunning(!isRunning)}>
            {/* {isRunning ? <Pause size={16} /> : <Play size={16} />} */}
            {isRunning ? "Pause" : "Start"}
          </Button>

          <Button onClick={reset}>
            {/* <RotateCcw size={16} /> */}
            Reset
          </Button>
        </div>
      </Card>

      {/* Animation Container */}
      <Card className={classes.container}>
        <div data-mode-cs>
          {/* User */}
          <div>
            <div>{/* <User size={32} /> */}</div>
            <span>User</span>
          </div>

          {/* Animating Requests */}
          {animatingRequests.map((request: Request) => {
            const age = Date.now() - request.timestamp;
            const progress = Math.min(age / 1000, 1); // 1-second animation
            const leftPosition = 15 + progress * 35; // Move from user (15%) to bucket (50%)

            return (
              <div
                key={request.id}
                className={classes.request}
                style={{
                  left: `${leftPosition}%`,
                  top: "45%",
                  background: RequestStatusIndicators.MovingToBucket,
                  transform: "translateY(-50%)",
                }}
              />
            );
          })}

          {/* Bucket */}
          <div className={classes.leakyBucket}>
            <div
              /* Water level */
              style={{
                background: `
  linear-gradient(
    to top,
    #aaFa 0%,
    #aaFa ${bucketFillPercentage}%,
    transparent ${bucketFillPercentage}%,
    transparent 100%
  )`,
              }}
            >
              {/* Bucket capacity indicator */}
              <div>
                {Array.from({ length: bucketSize }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      background: i < bucket.length ? "#0ffa" : "transparent",
                    }}
                  />
                ))}
              </div>
              {/* Leak holes at the bottom */}
              <div>
                {Array.from({ length: Math.min(fillRate, 3) }, (_, i) => (
                  <div key={i} />
                ))}
              </div>
            </div>
            <span>
              Bucket ({bucket.length}/{bucketSize})
            </span>
          </div>
          {/* Processing Requests */}
          {processingRequests.map((request: Request, idx: number) => {
            const age = Date.now() - request.processTime;
            const progress = Math.min(age / 1000, 1); // 1-second animation
            const leftPosition = 50 + progress * 35; // Move from bucket (50%) to server (85%)

            return (
              <div
                key={idx}
                className={classes.request}
                style={{
                  left: `${leftPosition}%`,
                  top: "45%",
                  background: RequestStatusIndicators.AcceptedProcessed,
                  transform: "translateY(-50%)",
                }}
              />
            );
          })}
          {/* Dropped Requests */}
          {droppedRequests.map((request: Request, idx: number) => {
            const age = Date.now() - request.dropTime;
            const progress = Math.min(age / 1500, 1); // 1.5-second fall animation
            const topPosition = 45 + progress * 40; // Fall down from bucket level

            return (
              <div
                key={idx}
                className={classes.request}
                style={{
                  background: RequestStatusIndicators.Dropped,
                  left: "50%",
                  top: `${topPosition}%`,
                  transform: "translateX(-50%)",
                  opacity: 1 - progress, // Fade out as it falls
                }}
              />
            );
          })}

          {/* Server */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{/* <Server size={32} /> */}</div>
            <span>Server</span>
            <span>{fillRate} req/s</span>
          </div>
        </div>

        {/* Legend */}
        <div>
          <h4>Request Status:</h4>
          <div style={{ background: RequestStatusIndicators.MovingToBucket }}>
            <span>Moving to Bucket</span>
          </div>
          <div
            style={{ background: RequestStatusIndicators.AcceptedProcessed }}
          >
            <span>Accepted & Processed</span>
          </div>
          <div style={{ background: RequestStatusIndicators.Dropped }}>
            <span>Dropped (No Tokens)</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className={classes.stats}>
        <Card>
          <div>{stats.processedRequests}</div>
          <sub>Processed</sub>
        </Card>

        <Card>
          <div>{stats.droppedRequests}</div>
          <sub>Dropped</sub>
        </Card>

        <Card>
          <div>{stats.currentBucketSize}</div>
          <sub>In Bucket</sub>
        </Card>
      </div>
    </div>
  );
};

export default LeakyBucketSimulator;

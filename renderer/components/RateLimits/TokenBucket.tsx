import React from "react";
import classes from "./style.module.scss";
import { Card } from "./Card";
import Button from "@/components/Button";

interface Packet {
  id: string;
  status: "moving" | "accepted" | "dropped";
  timestamp: number;
}

// TODO: split logic&ui
const TokenBucketSimulator = () => {
  const [capacity, setCapacity] = React.useState<number>(15);
  const [refillRate, setRefillRate] = React.useState<number>(3);
  const [tokens, setTokens] = React.useState<number>(capacity);
  const [processed, setProcessed] = React.useState<number>(0);
  const [dropped, setDropped] = React.useState<number>(0);
  const [running, setRunning] = React.useState<boolean>(true);
  const [packets, setPackets] = React.useState<Packet[]>([]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTokens((prev) => Math.min(prev + refillRate, capacity));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, refillRate, capacity]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPackets((prev) => prev.filter((p) => Date.now() - p.timestamp < 3000));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const sendRequest = () => {
    const id = Math.random().toString(36).substring(2, 15);
    const packet: Packet = {
      id,
      status: "moving",
      timestamp: Date.now(),
    };
    setPackets((prev) => [...prev, packet]);

    setTimeout(() => {
      setTokens((prev) => {
        if (prev > 0) {
          setProcessed((p) => p + 1);
          setPackets((pkts) =>
            pkts.map((p) => (p.id === id ? { ...p, status: "accepted" } : p))
          );
          return prev - 1;
        } else {
          setDropped((d) => d + 1);
          setPackets((pkts) =>
            pkts.map((p) => (p.id === id ? { ...p, status: "dropped" } : p))
          );
          return prev;
        }
      });
    }, 800);
  };

  const reset = () => {
    setRunning(false);
    setTokens(capacity);
    setProcessed(0);
    setDropped(0);
    setPackets([]);
  };

  const successRate =
    processed + dropped === 0
      ? 100
      : Math.round((processed / (processed + dropped)) * 100);

  return (
    <div className={classes.root}>
      <h3>Token Bucket Rate Limiter Simulator</h3>

      <Card className={classes.controls}>
        <div>
          <label>
            Bucket Capacity
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              min={1}
              max={20}
            />
          </label>
          <sub>{capacity} tokens</sub>
        </div>
        <div>
          <label>
            Refill Rate
            <input
              type="number"
              value={refillRate}
              onChange={(e) => setRefillRate(Number(e.target.value))}
              min={1}
              max={5}
            />
          </label>
          <sub>{refillRate}/second</sub>
        </div>
        <div>
          <Button onClick={sendRequest}>
            {/* <Play className="mr-2 w-4 h-4" /> */}
            Send Request
          </Button>

          <Button onClick={() => setRunning(!running)}>
            {running ? (
              <>
                {/* <Pause className="mr-2 w-4 h-4" /> */}
                Pause
              </>
            ) : (
              <>
                {/* <Play className="mr-2 w-4 h-4" /> */}
                Start
              </>
            )}
          </Button>
          <Button onClick={reset}>
            {/* <RefreshCw className="mr-2 w-4 h-4" /> */}
            Reset
          </Button>
        </div>
      </Card>

      <Card className={classes.container}>
        <div data-mode-cs>
          <div>
            <div>{/* <User size={32} /> */}</div>
            <span>User</span>
          </div>

          <div className={classes.tokensBucket}>
            <div>
              {Array.from({ length: capacity }).map((_, i) => (
                <div
                  key={i}
                  className={classes.request}
                  style={{
                    transitionDelay: `${i * 30}ms`,
                    background: "#afa",
                    opacity: i < tokens ? 1 : 0,
                  }}
                ></div>
              ))}
            </div>
            <div>
              {tokens}/{capacity} tokens
            </div>
          </div>

          {packets.map((packet) => (
            <div
              key={packet.id}
              className={classes.request}
              style={{
                transitionProperty: "all",
                transitionDuration: "750ms",
                left:
                  packet.status === "moving"
                    ? 0
                    : packet.status === "accepted"
                      ? "80%"
                      : "40%",
                top: packet.status === "dropped" ? "85%" : "50%",
                translate:
                  packet.status === "dropped" ? "" : "translateY(-50%)",
                backgroundColor:
                  packet.status === "moving"
                    ? "#facc15"
                    : packet.status === "accepted"
                      ? "#22c55e"
                      : "#ef4444",
              }}
            ></div>
          ))}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{/* <Server size={32} /> */}</div>
            <span>Server</span>
          </div>
        </div>
        <div></div>
      </Card>

      <div
        className={classes.stats}
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        <Card>
          <div>{tokens}</div>
          <sub>Current Tokens</sub>
        </Card>
        <Card>
          <div>{processed}</div>
          <sub>Processed</sub>
        </Card>
        <Card>
          <div>{dropped}</div>
          <sub>Dropped</sub>
        </Card>
        <Card>
          <div>{successRate}%</div>
          <sub>Success Rate</sub>
        </Card>
      </div>
    </div>
  );
};

export default TokenBucketSimulator;

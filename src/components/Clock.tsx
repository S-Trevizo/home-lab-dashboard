import { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ textAlign: "right" }}>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 32,
          fontWeight: 300,
          color: "#f0ede8",
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        {hh}
        <span style={{ opacity: 0.4, animation: "blink 1s step-end infinite" }}>:</span>
        {mm}
        <span style={{ opacity: 0.35, fontSize: 20 }}>:{ss}</span>
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: "rgba(240,237,232,0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 4,
        }}
      >
        {dateStr}
      </div>
    </div>
  );
}
import type { ServiceStatus } from "../data/services";

interface StatusDotProps {
  status: ServiceStatus;
  color: string;
}

export function StatusDot({ status, color }: StatusDotProps) {
  const colors: Record<ServiceStatus, string> = {
    up: color,
    down: "#c13a3a",
    timeout: "#c1a23a",
    checking: "#555",
  };

  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: colors[status],
        boxShadow: status === "up" ? `0 0 8px ${color}` : "none",
        animation: status === "checking" ? "pulse 1.5s ease-in-out infinite" : "none",
        transition: "background-color 0.5s, box-shadow 0.5s",
      }}
    />
  );
}
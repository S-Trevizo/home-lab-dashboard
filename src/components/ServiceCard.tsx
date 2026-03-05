import { useState } from "react";
import type { Service, ServiceStatus } from "../data/services";
import { StatusDot } from "./StatusDot";

interface ServiceCardProps {
  service: Service;
  status: ServiceStatus;
  index: number;
}

const STATUS_LABEL: Record<ServiceStatus, string> = {
  up: "Online",
  down: "Unreachable",
  timeout: "Timeout",
  checking: "Checking…",
};

export function ServiceCard({ service, status, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? service.accentColor + "66" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 32px ${service.accentColor}22` : "none",
        animationDelay: `${index * 80}ms`,
        animation: "fadeUp 0.5s ease both",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 28, marginBottom: 8, lineHeight: 1 }}>
            {/\.(svg|png|jpg|jpeg|gif|webp)$/i.test(service.icon) ? (
              <img src={service.icon} alt={service.name} style={{ width: 28, height: 28 }} />
            ) : (
              service.icon
            )}
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 15,
              fontWeight: 600,
              color: "#f0ede8",
              letterSpacing: "0.01em",
              marginBottom: 3,
            }}
          >
            {service.name}
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "rgba(240,237,232,0.4)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {service.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <StatusDot status={status} color={service.accentColor} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: status === "up" ? service.accentColor : "rgba(240,237,232,0.35)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          height: 1,
          background: `linear-gradient(90deg, ${service.accentColor}${hovered ? "88" : "33"}, transparent)`,
          transition: "all 0.3s ease",
        }}
      />
    </a>
  );
}
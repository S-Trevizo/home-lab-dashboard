import { useState, useEffect } from "react";

type ServiceStatus = "checking" | "up" | "down" | "timeout";

interface Service {
  name: string;
  subtitle: string;
  url: string;
  checkUrl: string;
  icon: string;
  accentColor: string;
}

const SERVICES: Service[] = [
  {
    name: "Foundry VTT",
    subtitle: "Virtual Tabletop",
    url: "https://foundry.xeon.quest",
    checkUrl: "https://foundry.xeon.quest",
    icon: "⚔️",
    accentColor: "#c17f3a",
  },
  {
    name: "Overseerr",
    subtitle: "Media Requests",
    url: "https://overseerr.xeon.quest",
    checkUrl: "https://overseerr.xeon.quest",
    icon: "🎬",
    accentColor: "#3a7fc1",
  },
  {
    name: "Tautulli",
    subtitle: "Plex Analytics",
    url: "https://tautulli.xeon.quest",
    checkUrl: "https://tautulli.xeon.quest",
    icon: "📊",
    accentColor: "#3ac17f",
  },
  {
    name: "Firefly III",
    subtitle: "Personal Finance",
    url: "https://firefly.xeon.quest",
    checkUrl: "https://firefly.xeon.quest",
    icon: "🔥",
    accentColor: "#c13a5a",
  },
];

function useServiceStatus(services: Service[]): Record<string, ServiceStatus> {
  const [statuses, setStatuses] = useState<Record<string, ServiceStatus>>(() =>
    Object.fromEntries(services.map((s) => [s.name, "checking" as ServiceStatus]))
  );

  useEffect(() => {
    async function checkAll() {
      const results = await Promise.all(
        services.map(async (service): Promise<[string, ServiceStatus]> => {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            await fetch(service.checkUrl, {
              method: "HEAD",
              mode: "no-cors",
              signal: controller.signal,
            });
            clearTimeout(timeout);
            return [service.name, "up"];
          } catch (e) {
            if (e instanceof Error && e.name === "AbortError") {
              return [service.name, "timeout"];
            }
            return [service.name, "down"];
          }
        })
      );
      setStatuses(Object.fromEntries(results));
    }

    checkAll();
    const interval = setInterval(checkAll, 30000);
    return () => clearInterval(interval);
  }, []);

  return statuses;
}

interface StatusDotProps {
  status: ServiceStatus;
  color: string;
}

function StatusDot({ status, color }: StatusDotProps) {
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

interface ServiceCardProps {
  service: Service;
  status: ServiceStatus;
  index: number;
}

function ServiceCard({ service, status, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  const statusLabel: Record<ServiceStatus, string> = {
    up: "Online",
    down: "Unreachable",
    timeout: "Timeout",
    checking: "Checking…",
  };

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
            {service.icon}
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
            {statusLabel[status]}
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

function Clock() {
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

export default function Dashboard() {
  const statuses = useServiceStatus(SERVICES);
  const upCount = Object.values(statuses).filter((s) => s === "up").length;
  const total = SERVICES.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0f; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0f",
          color: "#f0ede8",
          fontFamily: "'DM Mono', monospace",
          padding: "48px 40px",
          maxWidth: 860,
          margin: "0 auto",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.35)",
                marginBottom: 6,
              }}
            >
              xeon.quest
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "#f0ede8",
                letterSpacing: "-0.01em",
              }}
            >
              Home Services
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                letterSpacing: "0.1em",
                color:
                  upCount === total
                    ? "#3ac17f"
                    : upCount === 0
                    ? "#c13a3a"
                    : "#c1a23a",
                textTransform: "uppercase",
              }}
            >
              {upCount}/{total} online
            </div>
          </div>

          <Clock />
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
            marginBottom: 32,
          }}
        />

        {/* Service Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.name}
              service={service}
              status={statuses[service.name] ?? "checking"}
              index={i}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(240,237,232,0.2)",
            textTransform: "uppercase",
          }}
        >
          <span>Proxmox · Ryzen 5650G · 16GB RAM</span>
          <span>Status refreshes every 30s</span>
        </div>
      </div>
    </>
  );
}
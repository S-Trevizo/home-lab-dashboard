import { SERVICES } from "./data/services";
import { ServiceCard } from "./components/ServiceCard";
import { Clock } from "./components/Clock";
import { useServiceStatus } from "./hooks/useServiceStatus";

export default function App() {
  const statuses = useServiceStatus(SERVICES);
  const upCount = Object.values(statuses).filter((s) => s === "up").length;
  const total = SERVICES.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500;600&display=swap');

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
          <span>Proxmox · Ryzen 5650G · 32GB RAM</span>
          <span>Status refreshes every 30s</span>
        </div>
      </div>
    </>
  );
}
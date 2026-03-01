import { useState, useEffect } from "react";
import type { Service, ServiceStatus } from "../data/services";

export function useServiceStatus(services: Service[]): Record<string, ServiceStatus> {
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
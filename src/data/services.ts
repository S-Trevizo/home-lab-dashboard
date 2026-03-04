export type ServiceStatus = "checking" | "up" | "down" | "timeout";

export interface Service {
  name: string;
  subtitle: string;
  url: string;
  checkUrl: string;
  icon: string;
  accentColor: string;
}

export const SERVICES: Service[] = [
  {
    name: "Foundry VTT",
    subtitle: "Virtual Tabletop",
    url: "https://foundry.xeon.quest",
    checkUrl: "https://foundry.xeon.quest",
    icon: "⚔️",
    accentColor: "#c17f3a",
  },
  {
    name: "Seerr",
    subtitle: "Media Requests",
    url: "https://seerr.xeon.quest",
    checkUrl: "https://seerr.xeon.quest",
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
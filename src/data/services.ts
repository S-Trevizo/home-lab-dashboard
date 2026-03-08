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
    icon: "/foundry_icon.png",
    accentColor: "#c79243",
  },
  {
    name: "Seerr",
    subtitle: "Media Requests",
    url: "https://seerr.xeon.quest",
    checkUrl: "https://seerr.xeon.quest",
    icon: "/seerr_icon.png",
    accentColor: "#903ace",
  },
  {
    name: "Firefly III",
    subtitle: "Personal Finance",
    url: "https://firefly.xeon.quest",
    checkUrl: "https://firefly.xeon.quest",
    icon: "/firefly_icon.svg",
    accentColor: "#c13a5a",
  },
  {
    name: "Immich",
    subtitle: "Photo Management",
    url: "https://photos.xeon.quest",
    checkUrl: "https://photos.xeon.quest",
    icon: "/immich_icon.svg",
    accentColor: "#e0de59",
  },
  {
    name: "Nextcloud",
    subtitle: "File Sync & Sharing",
    url: "https://cloud.xeon.quest",
    checkUrl: "https://cloud.xeon.quest",
    icon: "/nextcloud_icon.svg",
    accentColor: "#3a9fc1"
  },
  {
    name: "Tautulli",
    subtitle: "Plex Analytics",
    url: "https://tautulli.xeon.quest",
    checkUrl: "https://tautulli.xeon.quest",
    icon: "/tautulli_icon.svg",
    accentColor: "#3ac17f",
  },
  {
    name: "Grafana",
    subtitle: "Observability",
    url: "https://grafana.xeon.quest",
    checkUrl: "https://grafana.xeon.quest",
    icon: "/grafana_icon.svg",
    accentColor: "#FF9830",
  }
];
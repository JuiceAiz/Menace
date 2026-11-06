import type { MetadataRoute } from "next";
import { players } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://menace.gg").replace(/\/$/, "");
  const routes = [
    { path: "", priority: 1 },
    { path: "/roster", priority: 0.9 },
    { path: "/matches", priority: 0.9 },
    { path: "/achievements", priority: 0.7 },
    { path: "/news", priority: 0.8 },
    { path: "/media", priority: 0.7 },
    { path: "/store", priority: 0.8 },
    { path: "/partners", priority: 0.6 },
    { path: "/join", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...players.map((player) => ({
      url: `${base}/roster/${player.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

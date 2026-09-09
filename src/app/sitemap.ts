import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/resume"].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date("2026-09-09"),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.8,
  }));
}

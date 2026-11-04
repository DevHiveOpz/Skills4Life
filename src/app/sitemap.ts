import type { MetadataRoute } from "next";
import { site, sitemapPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPages.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}

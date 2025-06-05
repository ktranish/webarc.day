import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.webarc.day";

  // Static routes
  const routes = [
    "",
    "/blog",
    "/tools",
    "/contact",
    "/sitemap",
    "/legal",
    "/legal/terms",
    "/legal/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}

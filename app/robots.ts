import type { MetadataRoute } from "next";

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/static/chunks/", "/api/"],
    },
    sitemap: "https://www.webarc.day/sitemap.xml",
    host: "https://www.webarc.day",
  };
}

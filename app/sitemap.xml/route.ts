import { BASE_URL } from "@/constants";
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("webarc");
    const collection = db.collection("articles");
    const count = await collection.countDocuments();

    const totalSitemaps = Math.ceil(count / 1000);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap/main.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
${Array.from(
  { length: totalSitemaps },
  (_, i) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join("\n")}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}

import { BASE_URL } from "@/constants";
import client from "@/lib/mongodb";
import type { MetadataRoute } from "next";

const POSTS_PER_SITEMAP = 1000;

export async function generateSitemaps() {
  const db = client.db("webarc");
  const collection = db.collection("articles");
  const count = await collection.countDocuments();

  const totalSitemaps = Math.ceil(count / POSTS_PER_SITEMAP);

  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const db = client.db("webarc");
  const collection = db.collection("articles");
  const articles = await collection
    .find()
    .sort({ _id: -1 })
    .skip(id * POSTS_PER_SITEMAP)
    .limit(POSTS_PER_SITEMAP)
    .toArray();

  return (articles || []).map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}

import { BASE_URL } from "@/constants";
import client from "@/lib/mongodb";
import type { MetadataRoute } from "next";

const POSTS_PER_SITEMAP = 1000;

export async function generateSitemaps() {
  const db = client.db("webarc");
  const collection = db.collection("posts");
  const count = await collection.countDocuments({ draft: false });

  const totalSitemaps = Math.ceil(count / POSTS_PER_SITEMAP);

  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const db = client.db("webarc");
  const collection = db.collection("posts");
  const posts = await collection
    .find({ draft: false })
    .sort({ _id: -1 })
    .skip(id * POSTS_PER_SITEMAP)
    .limit(POSTS_PER_SITEMAP)
    .toArray();

  return (posts || []).map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}

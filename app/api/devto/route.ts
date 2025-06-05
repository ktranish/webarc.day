import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DEVTO_API = "https://dev.to/api/articles/latest?per_page=10&tag=webdev";

interface DevToPost {
  id: number;
  title: string;
  description: string | null;
  summary: string | null;
  tag_list: string[];
  url: string;
  published_at: string | null;
}

interface FormattedPost {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
  id: number;
  _timestamp: number;
  source: string;
}

function createObjectIdFromTimestamp(
  timestamp: number,
  source: string,
): ObjectId {
  const hexTimestamp = timestamp.toString(16).padStart(8, "0");
  // Use source name to generate consistent remaining bytes
  const sourceHash = source
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sourceHex = sourceHash.toString(16).padStart(16, "0");
  return new ObjectId(hexTimestamp + sourceHex);
}

export async function GET() {
  try {
    // Fetch latest posts from Dev.to
    const res = await fetch(DEVTO_API);
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Dev.to" }),
        { status: 502 },
      );
    }
    const posts = (await res.json()) as DevToPost[];

    // Format posts to match local news structure
    const formatted: FormattedPost[] = posts.map((post) => {
      // Get timestamp in seconds
      const timestamp = post.published_at
        ? Math.floor(new Date(post.published_at).getTime() / 1000)
        : Math.floor(Date.now() / 1000);

      return {
        favicon: `https://www.google.com/s2/favicons?domain=dev.to&sz=64`,
        title: post.title,
        description: post.description || post.summary || post.title,
        category: post.tag_list[0],
        link: post.url,
        date: new Date(timestamp * 1000).toISOString().split("T")[0],
        id: post.id,
        _timestamp: timestamp, // Store raw timestamp for ObjectId creation
        source: "dev.to",
      };
    });

    // Insert posts into MongoDB
    const db = client.db("webarc");
    const collection = db.collection("posts");

    // Upsert by id to avoid duplicates, using custom ObjectId
    const ops = formatted.map((post) =>
      collection.updateOne(
        { id: post.id },
        {
          $set: {
            ...post,
            _id: createObjectIdFromTimestamp(post._timestamp, "devto"),
          },
          $setOnInsert: { draft: true },
        },
        { upsert: true },
      ),
    );
    await Promise.all(ops);

    // Return the formatted posts (without id and _timestamp)
    return new Response(
      JSON.stringify(
        formatted.map((post) => {
          const { id, _timestamp, ...rest } = post;
          return rest;
        }),
      ),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

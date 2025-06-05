import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const REDDIT_API = "https://www.reddit.com/r/programming/new.json?limit=10";

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  permalink: string;
  created_utc: number;
}

interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

interface FormattedPost {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
  id: string;
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
    // Fetch latest posts from r/programming
    const res = await fetch(REDDIT_API, {
      headers: { "User-Agent": "webarc.day bot" },
    });
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Reddit" }),
        { status: 502 },
      );
    }
    const data = (await res.json()) as RedditResponse;
    const posts = data.data.children.map((child) => child.data);

    // Format posts to match local news structure
    const formatted: FormattedPost[] = posts.map((post) => {
      // Get timestamp in seconds
      const timestamp = post.created_utc || Math.floor(Date.now() / 1000);

      return {
        favicon: `https://www.google.com/s2/favicons?domain=reddit.com&sz=64`,
        title: post.title,
        description: post.selftext ? post.selftext.slice(0, 180) : post.title,
        category: "programming",
        link: `https://reddit.com${post.permalink}`,
        date: new Date(timestamp * 1000).toISOString().split("T")[0] as string,
        id: post.id,
        _timestamp: timestamp, // Store raw timestamp for ObjectId creation
        source: "reddit-programming",
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
            _id: createObjectIdFromTimestamp(
              post._timestamp,
              "reddit-programming",
            ),
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

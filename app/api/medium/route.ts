import client from "@/lib/mongodb";
import { XMLParser } from "fast-xml-parser";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Medium RSS feeds for different topics
const MEDIUM_FEEDS = {
  webdev: "https://medium.com/feed/tag/web-development",
  frontend: "https://medium.com/feed/tag/front-end-development",
  backend: "https://medium.com/feed/tag/backend-development",
  devops: "https://medium.com/feed/tag/devops",
  security: "https://medium.com/feed/tag/web-security",
  performance: "https://medium.com/feed/tag/web-performance",
  accessibility: "https://medium.com/feed/tag/web-accessibility",
  design: "https://medium.com/feed/tag/web-design",
  testing: "https://medium.com/feed/tag/web-testing",
  architecture: "https://medium.com/feed/tag/web-architecture",
};

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  "content:encoded"?: string;
  "dc:creator": string;
  category: string[];
  guid: string;
}

interface FormattedPost {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
  favicon: string;
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

function extractDescription(
  content: string | undefined,
  title: string,
): string {
  if (!content) return title;

  try {
    // Try to extract first paragraph
    const contentMatch = content.match(/<p>(.*?)<\/p>/);
    if (contentMatch && contentMatch[1]) {
      // Remove HTML tags and decode entities
      const cleanText = contentMatch[1]
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      return cleanText.slice(0, 180);
    }
  } catch (error) {
    console.error("Error extracting description:", error);
  }

  return title;
}

export async function GET() {
  try {
    const allPosts: FormattedPost[] = [];

    // Fetch posts from each feed
    for (const [category, feedUrl] of Object.entries(MEDIUM_FEEDS)) {
      try {
        const res = await fetch(feedUrl);
        if (!res.ok) {
          console.error(
            `Failed to fetch Medium feed for ${category}: ${res.status}`,
          );
          continue;
        }

        const xmlData = await res.text();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
          textNodeName: "#text",
          parseAttributeValue: true,
          parseTagValue: true,
          trimValues: true,
        });
        const result = parser.parse(xmlData);

        // Check if we have valid RSS data
        if (!result?.rss?.channel?.item) {
          console.error(`Invalid RSS data for ${category}`);
          continue;
        }

        // Extract posts from the feed
        const posts: MediumPost[] = Array.isArray(result.rss.channel.item)
          ? result.rss.channel.item
          : [result.rss.channel.item];

        // Format posts
        const formattedPosts: FormattedPost[] = posts.map(
          (post: MediumPost) => {
            // Get timestamp in seconds
            const timestamp = Math.floor(
              new Date(post.pubDate).getTime() / 1000,
            );

            // Extract the ID from the guid URL
            const guidUrl =
              typeof post.guid === "string" ? post.guid : post.guid["#text"];
            const id = guidUrl.split("/").pop() || guidUrl;

            return {
              id,
              title: post.title,
              description: extractDescription(
                post["content:encoded"],
                post.title,
              ),
              category,
              link: post.link,
              date: new Date(timestamp * 1000)
                .toISOString()
                .split("T")[0] as string,
              favicon: `https://www.google.com/s2/favicons?domain=medium.com&sz=64`,
              _timestamp: timestamp,
              source: "medium",
            };
          },
        );

        allPosts.push(...formattedPosts);
      } catch (error) {
        console.error(`Error processing Medium feed for ${category}:`, error);
        continue;
      }
    }

    if (allPosts.length === 0) {
      return NextResponse.json(
        { error: "No posts were successfully fetched from any feed" },
        { status: 502 },
      );
    }

    // Sort posts by date (newest first)
    allPosts.sort((a, b) => b._timestamp - a._timestamp);

    // Take only the latest 30 posts
    const latestPosts = allPosts.slice(0, 30);

    // Insert posts into MongoDB
    const db = client.db("webarc");
    const collection = db.collection("posts");

    // Upsert by id to avoid duplicates
    const ops = latestPosts.map((post) =>
      collection.updateOne(
        { id: post.id },
        {
          $set: {
            ...post,
            _id: createObjectIdFromTimestamp(post._timestamp, "medium"),
          },
          $setOnInsert: { draft: true },
        },
        { upsert: true },
      ),
    );
    await Promise.all(ops);

    // Return formatted posts without internal fields
    const responsePosts = latestPosts.map(
      ({ id, _timestamp, ...post }) => post,
    );
    return NextResponse.json(responsePosts);
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return NextResponse.json({ error }, { status: 500 });
  }
}

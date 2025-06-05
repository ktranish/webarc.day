import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface HackerNewsPost {
  id: number;
  title: string;
  url: string;
  score: number;
  time: number;
  by: string;
  descendants: number;
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
  // Convert timestamp to hex string for first 8 bytes
  const hexTimestamp = Math.floor(timestamp).toString(16).padStart(8, "0");

  // Create a hash of the source name for remaining bytes
  const sourceHash = source
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString(16)
    .padStart(16, "0");

  // Combine to create ObjectId
  return new ObjectId(hexTimestamp + sourceHash);
}

export async function GET() {
  try {
    // Fetch top stories
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
    );
    const storyIds: number[] = await response.json();

    // Get first 30 stories
    const topStories = storyIds.slice(0, 30);

    // Fetch story details
    const storyPromises = topStories.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (res) => res.json(),
      ),
    );

    const stories: HackerNewsPost[] = await Promise.all(storyPromises);

    // Filter for web development related stories
    const webDevKeywords = [
      "javascript",
      "typescript",
      "react",
      "vue",
      "angular",
      "node",
      "next",
      "web",
      "frontend",
      "backend",
      "fullstack",
      "developer",
      "programming",
      "code",
      "software",
      "framework",
      "library",
      "api",
      "database",
      "cloud",
      "aws",
      "azure",
      "gcp",
      "devops",
      "docker",
      "kubernetes",
      "security",
      "performance",
      "testing",
      "design",
      "ui",
      "ux",
    ];

    const webDevStories = stories.filter((story) => {
      if (!story.url) return false;
      const title = story.title.toLowerCase();
      return webDevKeywords.some((keyword) => title.includes(keyword));
    });

    // Format stories
    const formattedPosts: FormattedPost[] = webDevStories.map((story) => {
      return {
        id: story.id.toString(),
        title: story.title,
        description: `${story.score} points by ${story.by} | ${story.descendants} comments`,
        category: "webdev",
        link: story.url,
        date: new Date(story.time * 1000).toISOString().split("T")[0],
        favicon: `https://www.google.com/s2/favicons?domain=news.ycombinator.com&sz=64`,
        _timestamp: story.time,
        source: "hackernews",
      };
    });

    // Insert into MongoDB
    const db = client.db("webarc");
    const collection = db.collection("posts");

    for (const post of formattedPosts) {
      await collection.updateOne(
        { id: post.id },
        {
          $set: {
            ...post,
            _id: createObjectIdFromTimestamp(post._timestamp, "hackernews"),
          },
          $setOnInsert: { draft: true },
        },
        { upsert: true },
      );
    }

    // Return formatted posts without internal fields
    const responsePosts = formattedPosts.map(
      ({ id, _timestamp, ...post }) => post,
    );

    return NextResponse.json(responsePosts);
  } catch (error) {
    console.error("Error fetching Hacker News posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

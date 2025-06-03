import client from "@/lib/mongodb";

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
    const formatted: FormattedPost[] = posts.map((post) => ({
      favicon: `https://www.google.com/s2/favicons?domain=dev.to&sz=64`,
      title: post.title,
      description: post.description || post.summary || post.title,
      category: post.tag_list[0],
      link: post.url,
      date: post.published_at
        ? post.published_at.split("T")[0]
        : new Date().toISOString().split("T")[0],
      id: post.id,
    }));

    // Insert posts into MongoDB
    const db = client.db("webarc");
    const collection = db.collection("posts");

    // Upsert by id to avoid duplicates
    const ops = formatted.map((post) =>
      collection.updateOne(
        { id: post.id },
        { $set: post, $setOnInsert: { draft: true } },
        { upsert: true },
      ),
    );
    await Promise.all(ops);

    // Return the formatted posts (without id)
    return new Response(
      JSON.stringify(
        formatted.map((post) => {
          const { id, ...rest } = post;
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

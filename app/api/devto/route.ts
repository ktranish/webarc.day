import client from "@/lib/mongodb";

const DEVTO_API = "https://dev.to/api/articles/latest?per_page=10&tag=webdev";

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
    const posts = await res.json();

    // Format posts to match local news structure
    const formatted = posts.map((post: any) => ({
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
    const ops = formatted.map((post: any) =>
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
        formatted.map((post: any) => {
          const { id, ...rest } = post;
          return rest;
        }),
      ),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

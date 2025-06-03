import client from "@/lib/mongodb";

const REDDIT_API = "https://www.reddit.com/r/webdev/new.json?limit=10";

export async function GET() {
  try {
    // Fetch latest posts from r/webdev
    const res = await fetch(REDDIT_API, {
      headers: { "User-Agent": "webarc.day bot" },
    });
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Reddit" }),
        { status: 502 },
      );
    }
    const data = await res.json();
    const posts = data.data.children.map((child: any) => child.data);

    // Format posts to match local news structure
    const formatted = posts.map((post: any) => {
      let domain = "";
      try {
        domain = new URL(post.url).hostname;
      } catch {}
      return {
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        title: post.title,
        description: post.selftext ? post.selftext.slice(0, 180) : post.title,
        category: "webdev",
        link: `https://reddit.com${post.permalink}`,
        date: post.created_utc
          ? new Date(post.created_utc * 1000).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        id: post.id, // keep for upsert
      };
    });

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

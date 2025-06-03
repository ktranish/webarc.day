import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = client.db("webarc");
    const collection = db.collection("posts");
    const { searchParams } = new URL(req.url);
    const limit = 6;
    const cursor = searchParams.get("cursor");

    const query: any = { draft: false };
    if (cursor) {
      query._id = { $lt: new ObjectId(cursor) };
    }

    const posts = await collection
      .find(query, { projection: { _id: 0 } })
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();

    // Fetch the _id of the last post for the next cursor
    const rawPosts = await collection
      .find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();
    const hasMore = rawPosts.length === limit;
    const nextCursor = hasMore
      ? rawPosts[rawPosts.length - 1]._id.toString()
      : null;

    return new Response(JSON.stringify({ posts, nextCursor, hasMore }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

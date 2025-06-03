import client from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = client.db("webarc");
    const collection = db.collection("posts");
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const posts = await collection
      .find({ draft: false }, { projection: { _id: 0 } })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments();
    const hasMore = skip + posts.length < total;

    return new Response(JSON.stringify({ posts, hasMore }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

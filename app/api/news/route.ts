import { LIMIT } from "@/constants";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

interface Post {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
}

interface MongoPost extends Post {
  _id: ObjectId;
}

interface MongoQuery {
  draft: boolean;
  _id?: { $lt: ObjectId };
}

interface NewsResponse {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const db = client.db("webarc");
    const collection = db.collection<MongoPost>("posts");
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    const query: MongoQuery = { draft: false };
    if (cursor) {
      query._id = { $lt: new ObjectId(cursor) };
    }

    const posts = await collection
      .find(query, { projection: { _id: 0 } })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .toArray();

    // Fetch the _id of the last post for the next cursor
    const rawPosts = await collection
      .find(query)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .toArray();
    const hasMore = rawPosts.length === LIMIT;
    const nextCursor = hasMore
      ? rawPosts[rawPosts.length - 1]._id.toString()
      : null;

    const response: NewsResponse = { posts, nextCursor, hasMore };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

import client from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { LIMIT } from "@/constants";

interface MongoArticle {
  _id: ObjectId;
  id: string;
  title: string;
  content_markdown: string;
  content_html: string;
  meta_description: string;
  created_at: string;
  image_url: string;
  slug: string;
  tags: string[];
}

interface MongoQuery {
  _id?: { $lt: ObjectId };
}

interface ArticlesResponse {
  articles: Omit<MongoArticle, "_id">[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const db = client.db("webarc");
    const collection = db.collection<MongoArticle>("articles");
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    const query: MongoQuery = {};
    if (cursor) {
      query._id = { $lt: new ObjectId(cursor) };
    }

    const articles = await collection
      .find(query, { projection: { _id: 0 } })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .toArray();

    // Fetch the _id of the last article for the next cursor
    const rawArticles = await collection
      .find(query)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .toArray();
    const hasMore = rawArticles.length === LIMIT;
    const lastArticle = rawArticles[rawArticles.length - 1];
    const nextCursor =
      hasMore && lastArticle?._id ? lastArticle._id.toString() : null;

    const response: ArticlesResponse = { articles, nextCursor, hasMore };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

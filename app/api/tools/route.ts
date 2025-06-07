import { LIMIT } from "@/constants";
import client from "@/lib/mongodb";
import type { ToolItem } from "@/types";
import { ObjectId } from "mongodb";

interface MongoTool extends ToolItem {
  _id: ObjectId;
  draft: boolean;
}

interface MongoQuery {
  _id?: { $lt: ObjectId };
  category?: { $in: string[] };
}

export async function GET(request: Request) {
  try {
    const db = client.db("webarc");
    const collection = db.collection<MongoTool>("tools");
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const categories = searchParams.get("categories")?.split(",") || [];

    // Build query
    const query: MongoQuery = {};
    if (cursor) {
      query._id = { $lt: new ObjectId(cursor) };
    }
    if (categories.length > 0) {
      query.category = { $in: categories };
    }

    // Get tools
    const tools = await collection
      .find(query)
      .sort({ _id: -1 })
      .limit(LIMIT + 1)
      .toArray();

    // Get last tool's _id for pagination
    const lastTool = tools[LIMIT - 1];
    const nextCursor = lastTool ? lastTool._id.toString() : null;

    // Check if there are more tools
    const hasMore = tools.length > LIMIT;

    // Remove the extra tool we fetched
    const toolsToReturn = hasMore ? tools.slice(0, LIMIT) : tools;

    return Response.json({
      tools: toolsToReturn,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return Response.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

import { LIMIT } from "@/constants";
import { getToolsByCursor } from "@/lib/data/tools";
import { Tool } from "@/types/tool";
import { Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const categories = searchParams.get("categories")?.split(",") || [];

    const filter: Filter<Tool> = {};
    if (categories.length > 0) {
      filter.category = { $in: categories };
    }

    const result = await getToolsByCursor(cursor || undefined, LIMIT, filter);

    return NextResponse.json({
      tools: result.tools,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 },
    );
  }
}

import { LIMIT } from "@/constants";
import { getNewsByCursor } from "@/lib/data/news";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const categories = searchParams.get("categories")?.split(",");

    const filter: any = { draft: false };
    if (categories && categories.length > 0) {
      filter.category = { $in: categories };
    }

    const result = await getNewsByCursor(cursor || undefined, LIMIT, filter);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

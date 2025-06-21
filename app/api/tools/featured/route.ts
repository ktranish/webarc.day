import { getFeaturedTools } from "@/lib/data/tools";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tools = await getFeaturedTools();

    return NextResponse.json({ tools });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return NextResponse.json({ error }, { status: 500 });
  }
}

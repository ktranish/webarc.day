import { getToolCategories } from "@/lib/data/tools";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getToolCategories();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching tool categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

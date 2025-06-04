import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("webarc");
    const categories = await db.collection("posts").distinct("category");

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

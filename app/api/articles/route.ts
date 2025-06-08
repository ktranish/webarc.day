import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("webarc");
    const collection = db.collection("articles");

    const articles = await collection
      .find({})
      .sort({ created_at: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

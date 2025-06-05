import client from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.OUTRANK_WEBHOOK_ACCESS_TOKEN;

function validateAccessToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  return token === ACCESS_TOKEN;
}

export async function POST(req: NextRequest) {
  // Validate access token
  if (!validateAccessToken(req)) {
    return NextResponse.json(
      { error: "Invalid access token" },
      { status: 401 },
    );
  }

  try {
    // Parse request body
    const article = await req.json();

    // Insert into MongoDB
    const db = client.db("webarc");
    const collection = db.collection("articles");

    await collection.insertOne(article);

    return NextResponse.json(
      {
        message: "Article created successfully",
        article: article,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}

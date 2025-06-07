import client from "@/lib/mongodb";

export async function GET() {
  try {
    const db = client.db("webarc");
    const categories = await db.collection("tools").distinct("category");

    return Response.json(categories);
  } catch (error) {
    console.error("Error fetching tool categories:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

import client from "@/lib/mongodb";

export async function GET() {
  try {
    const db = client.db("webarc");
    const collection = db.collection("tools");

    const tools = await collection
      .find({ featured: true })
      .sort({ _id: -1 })
      .toArray();

    return new Response(JSON.stringify({ tools }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

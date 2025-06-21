import { seedTools } from "@/lib/data/tools";

export async function GET() {
  try {
    const result = await seedTools();

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "Failed to seed tools",
          details: result.errors,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Tools seeded successfully",
        inserted: result.inserted,
        updated: result.updated,
        errors: result.errors,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

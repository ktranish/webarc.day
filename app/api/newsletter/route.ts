import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!AUDIENCE_ID) {
      return NextResponse.json(
        { error: "Audience ID not set" },
        { status: 500 },
      );
    }
    // Add to Resend audience
    await resend.contacts.create({ email, audienceId: AUDIENCE_ID });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message || "Failed to subscribe"
            : "Failed to subscribe",
      },
      { status: 500 },
    );
  }
}

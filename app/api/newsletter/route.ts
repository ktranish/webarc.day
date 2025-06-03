import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

async function verifyRecaptcha(token: string) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    },
  );

  const data = await response.json();
  return data.success && data.score >= 0.5;
}

export async function POST(req: NextRequest) {
  try {
    const { email, recaptchaToken } = await req.json();

    if (!email || !recaptchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json({ error: "Invalid reCAPTCHA" }, { status: 400 });
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

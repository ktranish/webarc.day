import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Missing reCaptcha token" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      },
    );

    const validation = await response.json();

    if (!validation.success) {
      return NextResponse.json(
        { error: "Unable to verify reCaptcha token" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

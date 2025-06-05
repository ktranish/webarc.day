import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request: Request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json({ error: "Invalid reCAPTCHA" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "ketryon <noreply@ketryon.com>",
      to: process.env.CONTACT_EMAIL || "",
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

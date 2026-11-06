import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: { email?: unknown };

  try {
    payload = (await request.json()) as { email?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhook) {
    // No mailing list connected yet: accept in demo mode so the UI can be reviewed.
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, source: "menace-site", subscribedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return NextResponse.json({ ok: true, mode: "live" });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't reach the mailing list. Please try again." },
      { status: 502 },
    );
  }
}

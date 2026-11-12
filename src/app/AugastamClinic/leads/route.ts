import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  clinic?: string;
  message?: string;
  plan?: string;
  period?: "y" | "m" | string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadBody;
    const { name, email, phone, clinic, message, plan, period } = body;

    // Basic required-field check so you don't send half-empty emails
    if (!name || !email || !phone || !plan) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fail loudly if env vars are missing instead of silently auth-failing
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASS env var");
      return NextResponse.json(
        { ok: false, error: "Server email not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS, // Gmail App Password, NOT your real password
      },
    });

    await transporter.sendMail({
      from: `"Pricing Leads" <${process.env.GMAIL_USER}>`,
      to: process.env.LEADS_TO_EMAIL || process.env.GMAIL_USER, // recipient is configurable
      replyTo: email,
      subject: `New lead: ${plan} (${period === "y" ? "Yearly" : "Monthly"})`,
      html: `
        <h2>New Pricing Lead</h2>
        <p><b>Plan:</b> ${escapeHtml(plan ?? "")} (${escapeHtml(period ?? "")})</p>
        <p><b>Name:</b> ${escapeHtml(name ?? "")}</p>
        <p><b>Email:</b> ${escapeHtml(email ?? "")}</p>
        <p><b>Phone:</b> ${escapeHtml(phone ?? "")}</p>
        <p><b>Clinic:</b> ${escapeHtml(clinic ?? "")}</p>
        <p><b>Message:</b> ${escapeHtml(message ?? "—")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send lead" },
      { status: 500 }
    );
  }
}

// Prevent HTML injection in the email body
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
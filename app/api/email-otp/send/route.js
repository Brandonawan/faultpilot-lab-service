import { NextResponse } from "next/server";
import { emailOtp, shouldUseSecureCookies, signedValue } from "@/lib/security";

export async function POST(request) {
  const { email } = await request.json().catch(() => ({}));
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ detail: "Enter a valid test inbox." }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ detail: "Email delivery is not configured. Add RESEND_API_KEY." }, { status: 503 });
  const code = emailOtp(email);
  const delivery = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.LAB_EMAIL_FROM || "FaultPilot Lab <lab@mail.faultpilot.com>", to: [email], subject: "Your FaultPilot Lab verification code", html: `<div style="font-family:Arial;padding:24px"><h2>FaultPilot Lab</h2><p>Your browser-test verification code is:</p><p style="font-size:30px;font-weight:700;letter-spacing:6px">${code}</p><p>This code expires in five minutes.</p></div>` }) });
  if (!delivery.ok) return NextResponse.json({ detail: "The email provider rejected the test message." }, { status: 502 });
  const response = NextResponse.json({ ok: true, sent_to: email.replace(/^(.{2}).*(@.*)$/, "$1***$2") });
  response.cookies.set("fp_lab_email", signedValue(email), { httpOnly: true, sameSite: "lax", secure: shouldUseSecureCookies(), maxAge: 600, path: "/" });
  return response;
}


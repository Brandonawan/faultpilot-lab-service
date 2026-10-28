import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { emailOtp, verifySigned } from "@/lib/security";

export async function POST(request) {
  const cookieStore = await cookies();
  const email = verifySigned(cookieStore.get("fp_lab_email")?.value);
  const { code } = await request.json().catch(() => ({}));
  const bucket = Math.floor(Date.now() / 300_000);
  const valid = email && [bucket, bucket - 1].some((value) => emailOtp(email, value) === String(code));
  return valid ? NextResponse.json({ ok: true }) : NextResponse.json({ detail: "The email code is invalid or expired." }, { status: 400 });
}

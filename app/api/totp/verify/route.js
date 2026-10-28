import { NextResponse } from "next/server";
import { LAB_TOTP_SECRET } from "@/lib/lab-config";
import { verifyTotp } from "@/lib/security";

export async function POST(request) {
  const { code } = await request.json().catch(() => ({}));
  if (!verifyTotp(code, LAB_TOTP_SECRET)) return NextResponse.json({ detail: "The authenticator code is invalid or expired." }, { status: 400 });
  return NextResponse.json({ ok: true });
}

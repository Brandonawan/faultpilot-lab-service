import { NextResponse } from "next/server";
import { LAB_PASSWORD, LAB_USER } from "@/lib/lab-config";
import { shouldUseSecureCookies, signedValue } from "@/lib/security";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  if (body.email !== LAB_USER || body.password !== LAB_PASSWORD) return NextResponse.json({ detail: "Invalid email or password." }, { status: 401 });
  const response = NextResponse.json({ ok: true, redirect: "/dashboard" });
  response.cookies.set("fp_lab_session", signedValue(LAB_USER), { httpOnly: true, sameSite: "lax", secure: shouldUseSecureCookies(), maxAge: 3600, path: "/" });
  return response;
}

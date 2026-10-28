"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ email:form.get("email"), password:form.get("password") }) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setError(data.detail || "Login failed.");
    router.push(data.redirect); router.refresh();
  }
  return <form onSubmit={submit}><label className="field">Email address<input data-testid="login-email" name="email" type="email" autoComplete="username" required /></label><label className="field">Password<input data-testid="login-password" name="password" type="password" autoComplete="current-password" required /></label>{error && <div role="alert" className="notice error">{error}</div>}<button data-testid="login-submit" className="button primary" style={{ width:"100%", marginTop:20 }} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button><div className="notice success"><strong>Test credentials</strong><br/>monitor@faultpilot.test<br/>FaultPilot-Lab-2026!</div></form>;
}

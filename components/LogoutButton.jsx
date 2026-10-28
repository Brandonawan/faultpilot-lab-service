"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() { const router=useRouter(); return <button data-testid="logout" className="button" onClick={async()=>{ await fetch("/api/auth/logout",{method:"POST"}); router.push("/auth/login"); router.refresh(); }}>Sign out</button>; }

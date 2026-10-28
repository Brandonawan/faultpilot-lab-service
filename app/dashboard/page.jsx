import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LabShell from "@/components/LabShell";
import LogoutButton from "@/components/LogoutButton";
import { verifySigned } from "@/lib/security";
export default async function Dashboard() { const store=await cookies(); if(!verifySigned(store.get("fp_lab_session")?.value)) redirect("/auth/login"); return <LabShell><p className="eyebrow">Authenticated application</p><h1 data-testid="dashboard-heading">Welcome to your lab dashboard.</h1><p className="lead">The login journey completed and the protected document rendered successfully.</p><div className="grid"><div className="card"><h2>99.99%</h2><p>Simulated availability</p></div><div className="card"><h2>12</h2><p>Healthy journeys</p></div><div className="card"><h2>0</h2><p>Open incidents</p></div></div><div className="actions"><LogoutButton /></div></LabShell>; }

import Link from "next/link";

export default function LabShell({ children }) {
  return <div className="shell"><header className="nav"><Link className="brand" href="/"><span className="mark" />FaultPilot Lab</Link><nav className="navlinks"><Link href="/scenarios">Scenarios</Link><Link href="/controls">Failure controls</Link><Link className="button primary" href="/auth/login">Test login</Link></nav></header><main className="main">{children}</main></div>;
}

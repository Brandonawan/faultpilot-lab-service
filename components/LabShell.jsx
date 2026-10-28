import Image from "next/image";
import Link from "next/link";

export default function LabShell({ children }) {
  return <div className="shell"><header className="nav"><Link className="brand" href="/" aria-label="FaultPilot Lab home"><Image src="/faultpilot-mark.svg" alt="" width={32} height={32} priority /><span>FaultPilot <strong>Lab</strong></span></Link><nav className="navlinks"><Link href="/scenarios">Scenarios</Link><Link href="/controls">Failure controls</Link><Link className="button primary" href="/auth/login">Test login</Link></nav></header><main className="main">{children}</main></div>;
}

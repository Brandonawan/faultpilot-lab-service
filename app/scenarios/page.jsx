import Link from "next/link";
import LabShell from "@/components/LabShell";
import { scenarios } from "@/lib/lab-config";

export default function Scenarios() {
  return <LabShell><p className="eyebrow">Permanent regression suite</p><h1>Browser journeys with known outcomes.</h1><p className="lead">Every scenario is intentionally stable. Failure variants are explicit, so a runner can distinguish a broken application from its own infrastructure.</p><div className="scenario-list">{scenarios.map(([name, description, href, type]) => <article className="scenario" key={name}><div><span className="tag">{type}</span><h2 style={{ margin:"10px 0 0", fontSize:20 }}>{name}</h2><p>{description}</p></div><Link className="button" href={href}>Open →</Link></article>)}</div></LabShell>;
}

import LabShell from "@/components/LabShell";import PopupButton from "@/components/PopupButton";
export default function Popup(){return <LabShell><div className="panel"><p className="eyebrow">Popup regression</p><h1 style={{fontSize:38}}>Open a second browser context</h1><p className="muted">The child page has a stable title and completion target.</p><PopupButton/></div></LabShell>}

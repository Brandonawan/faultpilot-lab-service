"use client";
export default function PopupButton(){return <button data-testid="open-popup" className="button primary" onClick={()=>window.open("/popup/child","fp-lab-popup","width=720,height=520")}>Open verification popup</button>}

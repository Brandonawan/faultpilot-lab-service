import "./styles.css";

export const metadata = {
  title: "FaultPilot Lab",
  description: "Deterministic browser-monitor regression scenarios",
  icons: { icon: "/faultpilot-mark.svg" }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

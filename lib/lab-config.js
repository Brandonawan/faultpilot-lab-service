export const LAB_USER = "monitor@faultpilot.test";
export const LAB_PASSWORD = "FaultPilot-Lab-2026!";
export const LAB_TOTP_SECRET = "JBSWY3DPEHPK3PXP";

export const scenarios = [
  ["Canonical authentication", "Login, route change, dashboard assertion and logout.", "/auth/login", "auth"],
  ["Authenticator MFA", "Generate and enter a live six-digit TOTP.", "/mfa", "totp"],
  ["Email OTP", "Send, wait for and verify an OTP through a real test inbox.", "/email-otp", "email"],
  ["Checkout journey", "Forms, selects, date input, checkbox, route-like state and CSV download.", "/checkout", "commerce"],
  ["Dynamic controls", "Autocomplete, hidden/visible state, dialogs and stable assertions.", "/interactions", "controls"],
  ["Popup and new tab", "Open a deterministic child page and assert its content.", "/popup", "popup"],
  ["Slow application", "Delay a document or API response without making the outcome ambiguous.", "/slow?ms=3000", "timing"],
  ["HTTP document error", "Return a genuine 500 document response for classification tests.", "/api/failure?status=500", "http"],
  ["Changed application", "Remove or disable the expected target deliberately.", "/interactions?variant=changed", "failure"],
  ["API response", "Return success, rate limiting, client errors, server errors or a timeout.", "/controls", "api"]
];

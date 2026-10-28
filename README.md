# FaultPilot Lab

A deterministic Next.js target application for FaultPilot recorder, runner and incident-classification regression tests. It is intentionally small, serverless-compatible and isolated per browser session.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000/scenarios`.

## Vercel deployment

Import this directory as a separate Vercel project and configure:

- `LAB_SIGNING_SECRET`: at least 32 random bytes.
- `LAB_SECURE_COOKIES`: leave unset on Vercel; use `false` for local HTTP.
- `RESEND_API_KEY`: optional, required only for real email OTP.
- `LAB_EMAIL_FROM`: a verified sender such as `FaultPilot Lab <lab@mail.faultpilot.com>`.

No database is required. Authentication and OTP state use signed, HTTP-only cookies. Failure selection uses URL parameters so concurrent executions cannot interfere with each other.

## Deterministic credentials

- Email: `monitor@faultpilot.test`
- Password: `FaultPilot-Lab-2026!`
- TOTP Base32 secret: `JBSWY3DPEHPK3PXP`

These values are intentionally public test fixtures. Never reuse them outside the lab.

## Canonical benchmark journeys

1. Login → dashboard assertion → logout.
2. Generate TOTP → verify code.
3. Send email OTP → wait for email → extract code → fill and verify.
4. Complete checkout → download and verify `fp-lab-order.csv`.
5. Autocomplete location → reveal advanced field → save preference.
6. Accept and dismiss JavaScript dialogs while validating their text.
7. Open popup → switch context → assert `Verification complete`.
8. Load `/slow?ms=3000` and distinguish slow success from failure.
9. Exercise `/api/failure` across 401, 404, 429, 500, 503 and delayed 200 responses.
10. Open `/interactions?variant=changed` to produce a genuine missing-target failure.

## Benchmark rules

- Reset by navigating to the scenario URL; there is no shared mutable server state.
- Run stable journeys repeatedly and track success, false failures, runner failures, false incidents, median duration and p95 duration.
- Controlled `4xx`/`5xx` and missing-target variants are genuine application failures.
- Runner crashes, browser launch failures and evidence-upload failures must remain `Unknown` and must not create customer incidents.

TLS expiry, DNS failures, connection refusal and HTTPS downgrade require separate test subdomains or disposable infrastructure; they cannot be faithfully simulated inside one Vercel application.

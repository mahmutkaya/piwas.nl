# piwas.nl

The company website for **Piwas** (Kurdish for *onion*) — an independent software
studio in Hoofddorp, NL. Home of **Domainio** (domain registration) and
**SofraPiwas** (restaurant platform, [sofrapiwas.com](https://sofrapiwas.com)).

> "Good software. Human roots."

Design mirrors the approved reference direction: warm paper, deep-green ink,
butter-yellow accents, Bricolage Grotesque display type, an illustrated onion
studio scene in the hero (with a pause-motion control), tilted receipt/ticket
previews on the product cards, and calm CSS-only animation throughout
(`prefers-reduced-motion` honored). No analytics, no cookie banner, no checkout —
by design (see `/legal/terms`).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Plain CSS design tokens + utility import in `app/globals.css` (single source of truth for the palette)
- lucide-react for the few icons used
- No database, no CMS, no client-side data. Fully static — deploy anywhere Next.js runs
  (the studio's Coolify/Netcup setup, Vercel, etc.).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so sitemap/robots/OG use the live domain.

## Page map

| Route | Purpose |
|---|---|
| `/` | hero, studio strip, the two products, services summary, onion/about, contact band |
| `/services` | offers: websites, custom software, care — plus the fixed-price test-automation kickstart |
| `/products/sofrapiwas`, `/products/domainio` | product detail pages (link out to the live products) |
| `/apps` | store-facing index |
| `/apps/<product>` | marketing URL for that app |
| `/apps/<product>/support` | **support URL** for App Store / Play Console |
| `/apps/<product>/privacy` | per-app privacy policy (overlay on the company policy) |
| `/apps/<product>/delete-account` | web account-deletion request (Play requirement) |
| `/contact` | email / phone / company details (mailto based — no form server needed) |
| `/support` | support index |
| `/legal/privacy`, `/legal/terms`, `/legal/imprint` | company-wide legal; imprint carries KVK/VAT/address |
| `/sitemap.xml`, `/robots.txt` | generated at build time |

`<product>` is `sofrapiwas` or `domainio`.

## App-store publishing

Paste these stable URLs into App Store Connect / Play Console:

| Store field | Where | URL |
|---|---|---|
| Privacy policy URL | App Store (required) · Play (required) | `piwas.nl/apps/<product>/privacy` |
| Support URL / support info | App Store (required) · Play (required) | `piwas.nl/apps/<product>/support` |
| Marketing URL | App Store (optional) | `piwas.nl/apps/<product>` |
| Account deletion (web) | Play (required for account-holding apps) | `piwas.nl/apps/<product>/delete-account` |
| Terms of service | Play listing field | `piwas.nl/legal/terms` |

Per-app policies intentionally inherit from `/legal/privacy`: each `/apps/<product>/privacy`
states only what *that* product collects. Edit `lib/content/` to update copy —
`company.ts` (business details), `products.ts` (product blurbs/capabilities),
`domainio/privacy.en.ts` + `sofra-privacy.json` (product policy snapshots).

## Payments (TWINT) — where this fits

This website is deliberately **not a checkout**; product payments run inside each
product (Domainio bills via Mollie, SofraPiwas via Stripe). Stripe's TWINT method
is enabled on the **Stripe account that invoices Sofra tenants**: Dashboard →
Payment methods → TWINT (Swiss acquiring, CHF-only sessions). What piwas.nl
contributes is the piece Stripe onboarding and App Store org enrolment actually
check: a live company domain with real business details, terms and contact —
all on `/legal/imprint` and `/contact`.

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL`, point DNS for `piwas.nl` at the deployment, TLS on
- [ ] Confirm the registered address is current (municipality renumbered
      Saturnusstraat 93 → Aulentistraat 159 in 2026; KVK record should match)
- [ ] Swap `domainio@piwas.nl` for a studio address (e.g. `hello@piwas.nl`) everywhere at
      once if wanted — it lives only in `lib/content/company.ts`
- [ ] Apple org enrolment will look for business info and hours on the site — both present
      (`/legal/imprint`, reply-time note on `/contact`); keep them accurate

## Deployed

**Live target: the Hetzner box at `46.225.91.200`, same server as Domainio** —
Coolify project `piwas`, app `piwas.nl.git:main-…` (uuid `yb29j92i5ksl7qexqhy1utes`),
nixpacks build, Traefik routes `piwas.nl` + `www.piwas.nl` with Let's Encrypt.

- Push to `main` → then trigger the deploy:
  - **Coolify UI** → piwas app → Deploy (dashboard via `ssh domainio-tunnel`,
    then `http://localhost:8000`), or
  - **CLI**: `ssh domainio-tunnel` in one shell, then
    `curl -G http://localhost:8000/api/v1/deploy -H "Authorization: Bearer $(sudo cat /etc/coolify-deploy-token on the box)" --data-urlencode "uuid=yb29j92i5ksl7qexqhy1utes" --data-urlencode "force=true"`
- Env vars on the app: `NEXT_PUBLIC_SITE_URL=https://piwas.nl`, `NEXT_TELEMETRY_DISABLED=1`.
- DNS: piwas.nl is registered at **mijndomein** — point `@` and `www`
  A-records at `46.225.91.200`. The Let's Encrypt certificate issues
  automatically on the first request after DNS flips.

## Docs

- `SECURITY.md` — full security analysis: attack surface, verified checks, header
  choices, npm-audit risk assessment, and the deploy-time hardening checklist (TLS,
  CAA, DNSSEC, SPF/DKIM/DMARC).
- `ANALYSIS.md` — v1 research (Stripe TWINT requirements, store metadata rules) with sources;
  the addendum records why the site was rebuilt from the approved reference design.

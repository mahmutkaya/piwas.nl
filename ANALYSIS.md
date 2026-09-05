# piwas.nl — research & analysis

> **Addendum (v2).** The v1 site built from this analysis was replaced after review:
> the design now mirrors the owner-approved reference (`~/Documents/ChatGPT/piwas.nl 2` —
> paper/green/yellow palette, Bricolage Grotesque, illustrated onion hero) and was
> finished from that reference's own plan (`docs/WEBSITE-PLAN.md`). The redundant
> `/pay` checkout page was removed — the site is intentionally not a checkout; TWINT
> enablement lives on the Stripe account that bills Sofra tenants, while this site
> provides the company/legal backbone (imprint, terms, per-app support & privacy
> URLs) that Stripe onboarding and store enrolment check. The research below
> (TWINT constraints, store metadata requirements) remains accurate.

Research done before building. Verdicts on each of your points: **include / exclude / extend**.
Sources cited at the bottom.

---

## 1. Company presentation site → **INCLUDE**

piwas (Kurdish: *onion*) is a Netherlands-registered company (Hoofddorp) building software,
websites and SaaS products. Two products are live in production and are the public face of
the company:

| Product | What it is | Live at |
|---|---|---|
| **Domainio** | AI-powered domain + website platform — search a domain, buy it, get a generated website deployed, no code touched | domainio (Next.js, Mollie, ResellerClub, Cloudflare Pages) |
| **Sofra** *(sofrapiwas)* | Restaurant-management SaaS grown out of RUMI Restaurant Geneva — QR menus & per-table ordering, kitchen/cashier/server order boards, reservations, loyalty, thermal-printer companion app, 10 locales (ar incl. RTL), Swiss VAT per order type | [sofrapiwas.com](https://sofrapiwas.com) — first tenant: rumirestaurant.ch |

**Decision:** the site presents the company through these two products only (per your
correction: no PIWAS-agent, no non-active side projects). "What we can do" is shown as
services derived from what these two products prove: web apps, SaaS platforms, mobile apps,
AI features, payments & integrations, self-hosted infra (Coolify/Hetzner).

## 2. "Suitable for iOS/Android apps to be published in the stores" → **INCLUDE, made concrete**

Both stores require public web URLs per app *before* you can submit:

| Store requirement | What this site provides |
|---|---|
| **Privacy policy URL** (App Store: required for *all* apps, App Store Connect metadata *and* inside the app; Play: required) | `piwas.nl/apps/sofra/privacy` and `/apps/domainio/privacy` |
| **Support URL** (App Store: required; Play: support info required) | `piwas.nl/apps/sofra/support` and `/apps/domainio/support` (contact + FAQ) |
| **Marketing URL** (optional, recommended) | `piwas.nl/apps/sofra`, `/apps/domainio` — landing pages with screenshots, features, store badges |
| Terms / EULA (Play shows Terms of service field; App Store links EULA) | `piwas.nl/terms`, linked from every app page |

**Decisions:**
- Include per-app landing, support and privacy pages with stable slugs — you paste these
  URLs into App Store Connect / Play Console and they will not change.
- Include store badge slots ("App Store / Google Play — coming soon" until published),
  plus `apple-itunes-app` smart-banner metadata hooks ready for real app IDs.
- **Exclude** PWA store-distribution (TWA/PWABuilder) as the delivery mechanism — Sofra's
  customer app and Domainio go native/hybrid into the stores; a PWA would duplicate that.
- **Exclude** building/submitting the apps themselves — out of scope for a website project.

## 3. Stripe TWINT → **INCLUDE with conditions, shipped integration-ready**

Research findings (Stripe docs, see sources):

- TWINT is a **Swiss** payment method; customers approve in their TWINT app.
- A Checkout Session supports TWINT only if **all line items and the session currency are
  `chf`** — EUR sessions will silently not offer TWINT.
- Activation happens in the **Stripe Dashboard** (Payments → payment methods); no separate
  TWINT agreement. Your Stripe account must be enabled for Swiss acquiring.
- Web integration is plain Stripe Checkout (`payment_method_types: ['twint']`) or the
  Payment Element. No extra SDK.

**Decision:** piwas.nl ships a working `/pay` page + `POST /api/checkout` that creates a
**CHF** Stripe Checkout Session with TWINT (+ cards). It is dormant until you set
`STRIPE_SECRET_KEY` — without it the page explains exactly what to enable, with the key it
redirects to real Stripe Checkout. One env var flips payments on. Documented step-by-step
in the README ("Enabling TWINT").

**Extend:** prices shown on `/pay` are in CHF because TWINT demands it — that matches
Sofra's reality (CH is the first market) even though the company books in EUR. Domainio
keeps its own Mollie setup; we are not migrating it here.

**Exclude:** Stripe Connect / application-fee logic on this site — that already lives in
Sofra's control plane. piwas.nl only needs direct charges.

## 4. Design direction → **INCLUDE, codified**

Your words: *onion, simplicity, matte-solid colours, casual informal cozy, creative/art/alive.*

| Element | Decision |
|---|---|
| Palette | Flat matte solids only: papery cream `#F3EDE0`, warm ink `#2B2723`, onion plum `#7C5E6B`, sprout olive `#8A9467`, paprika `#C97B54`, sand `#E4D8C3`. **No gradients, no glows, no shadows-as-decoration** — flat shapes and colour blocks only. |
| Motion | "Alive but calm": an onion hero that slowly breathes/peels its layers (SVG + CSS), swaying sprouts, floating onion-ring shapes with gentle parallax, a capabilities marquee, scroll-reveals via IntersectionObserver, a tiny growing sprout in the footer. Honors `prefers-reduced-motion`. |
| Tone | Casual, first-person-plural, short sentences. "We build software that earns its keep." No corporate buzzwords. |
| Type | Fraunces (soft, hand-crafted display) + Nunito (rounded, cozy body). |
| Art | Hand-drawn-feel SVG onion characters/scenes per product — Domainio gets an animated domain-search scene, Sofra an animated QR-menu/order scene. All inline SVG, no stock imagery, no heavy animation libs. |

**Exclude:** 3D/WebGL, GSAP/Framer Motion dependencies (CSS + a few lines of JS do it),
dark-pattern popups, newsletter modals.

## 5. Pages

- `/` — hero (living onion), what we do, the two products with animated scenes, services, how we work, contact CTA
- `/domainio`, `/sofra` — product pages (features, stack, links out to the live products)
- `/apps/sofra/*`, `/apps/domainio/*` — store-facing: landing, support, privacy
- `/services`, `/contact`, `/pay` (TWINT-ready checkout), `/privacy`, `/terms`, `/imprint`
- `sitemap.xml`, `robots.txt`, OG images, favicon (onion, of course)

## Sources

- [Stripe — TWINT payments](https://docs.stripe.com/payments/twint)
- [Stripe — Accept a TWINT payment](https://docs.stripe.com/payments/twint/accept-a-payment) (CHF-only requirement)
- [Stripe — Accept TWINT payments product page](https://stripe.com/payment-method/twint)
- [Stripe — Payments in Switzerland](https://stripe.com/resources/more/payments-in-switzerland)
- [Apple — Manage app privacy (privacy policy URL required)](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)
- [Apple — App privacy details](https://developer.apple.com/app-store/app-privacy-details/)
- [Apple — App Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/)
- Company/product facts: `/workspace/domainio` (README, pricing), `/workspace/rumi-workspace` (CLAUDE.md, `sofra/`, `lib/module-catalog.ts`), `/workspace/piwas-wiki`

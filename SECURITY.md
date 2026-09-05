# piwas.nl — security analysis

Deep-dive into the security posture of this website. Written 2026-09-06, after the
v2 rebuild. Verification commands included so every claim can be re-checked.

---

## 1. Attack surface — the short answer

This is a **fully static website**: 23 prerendered pages, **no API routes, no forms,
no database, no cookies, no sessions, no authentication, no JavaScript-run state that
matters**, and no user input anywhere in the request path. The contact "form" is a
`mailto:` link; the support flows are mailto links. There is nothing to log in to and
nothing to submit.

That is the single most effective security decision here: the entire class of
webapp vulnerabilities that comes from handling user input (injection, XSS-stored,
auth bypass, IDOR, CSRF) has **no target**. What remains is the Next.js static
server itself, the build pipeline, and the domain around it.

## 2. Verified findings (all checks re-runnable)

| Check | Result |
|---|---|
| `npm audit` | 2 findings (1 high, 1 moderate) — both in `postcss` bundled *inside* Next.js, build-time only. See §3. |
| XSS sinks | Only 2 `dangerouslySetInnerHTML` uses, both rendering **static, compile-time JSON-LD constants** with `<` escaped to `\u003c`. No user input exists to inject. |
| Client storage | No `localStorage`, `sessionStorage`, `document.cookie`, `eval`. No cookies are set at all (no consent banner needed — see privacy policy). |
| Secrets in code | None. `.env.example` contains only the public site URL. `.gitignore` excludes `.env*`. |
| `/_next/image` optimizer | Was enabled with zero benefit (site uses no `next/image`) — an unused dynamic endpoint that re-encodes images on demand. **Disabled** via `images.unoptimized: true`; external URLs were already rejected (400, no open-proxy). |
| API routes | None exist (`/api` directory removed in v2). Old checkout endpoints are gone. |
| Source maps | None shipped to the client (production default; verified no `.map` in client output). |
| Directory listing | Not possible (no autoindex on `/images/` etc.). |
| Response headers on **404s too** | CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS all present on every response including errors. |
| Clickjacking | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`. |
| MIME sniffing | `X-Content-Type-Options: nosniff`. |
| Open redirects | No server-side redirects exist that take a URL parameter (Stripe success/cancel redirects were removed with the checkout). |
| Supply chain (runtime deps) | Runtime dependencies: `next`, `react`, `react-dom`, `lucide-react` (icons). Nothing else. |
| `X-Powered-By` | Removed (`poweredByHeader: false`). |

## 3. The npm audit findings — assessed, not just pasted

Both advisories are in `postcss` as bundled by Next.js (`next/node_modules/postcss`):
unescaped `</style>` in stringify output, and path-traversal via attacker-controlled
`sourceMappingURL` in CSS comments.

**Exploitability here: effectively none.** These are *build-time* issues that require
attacker-controlled CSS as build input. The only CSS is our own `app/globals.css`,
written by us and versioned. There is no user-generated CSS anywhere.

**Remediation path:** the fix lands in `next@16.3.4` (major upgrade). Recommended:
upgrade in a quiet week, not under pressure — run `npm run build`, click through the
site, and re-run `npm audit`. Until then it is an accepted, documented risk with no
realistic vector. Re-check monthly with `npm audit`.

## 4. Content-Security-Policy — what it gives and what it costs

Current policy (all responses):

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'
'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';
frame-ancestors 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests
```

- `default-src 'self'` + no external hosts means: even if someone got XSS into a page,
  there is no third-party origin to exfiltrate to (no analytics, no CDN scripts exist).
- `unsafe-inline` for scripts/styles is the pragmatic trade-off: the Next.js App Router
  inlines its hydration payload and Tailwind emits inline styles. Removing it requires a
  nonce/hash pipeline that changes every build — not worth it for a site with no input
  surface. Documented here so it's a decision, not an oversight.
- `form-action 'none'` is belt-and-braces: the site has no forms.

## 5. Transport & hosting (applies at deploy time)

The dev server here is plain HTTP on localhost; TLS is a deployment concern:

- [ ] Terminate TLS with the box's Caddy (automatic Let's Encrypt) or Cloudflare; force
      HTTPS redirect. HSTS is already sent and will activate the moment HTTPS works.
- [ ] CAA DNS record limiting certificate issuance to your CA, e.g.
      `piwas.nl. CAA 0 issue "letsencrypt.org"`.
- [ ] Enable DNSSEC at the registrar if supported.
- [ ] Keep `NEXT_PUBLIC_SITE_URL` set to the https URL so canonical/OG/sitemap agree.
- [ ] Static content + immutable image caching means the origin has a tiny
      request-handling profile; a rate limit at the proxy (Caddy `rate_limit` module or
      Cloudflare) is plenty of DDoS posture for this site.

## 6. Domain & email hardening (recommended, outside the code)

The site publishes `domainio@piwas.nl` and phones — so the domain will be used for
mail and is a phishing target:

- [ ] **SPF + DKIM + DMARC** on `piwas.nl` before sending any mail from it
      (DMARC `p=quarantine` with reports is a fine start).
- [ ] Consider a role address (`hello@piwas.nl`) instead of the product-flavored
      `domainio@piwas.nl` — one-line change in `lib/content/company.ts`.
- [ ] The imprint publishes a personal mobile number because Dutch company-law pages
      are expected to list contact details; a VoIP number is a reasonable swap.

## 7. Process hardening

- [ ] Put the repo on GitHub (private), enable Dependabot alerts + weekly
      `npm audit` in CI; deploy with `npm ci` (lockfile-pinned).
- [ ] Pin the deploy image by digest (the sofra/infrastructure GHCR pattern already
      does this).
- [ ] `security.txt` is shipped at `/.well-known/security.txt` (RFC 9116) with a
      contact address and expiry — **remember to extend the expiry date yearly**.

## 8. Threat model in one table

| Threat | Exposure | Why |
|---|---|---|
| SQL/NoSQL injection | none | no database |
| XSS (stored/reflected) | ~none | no user input; React escaping; JSON-LD escaped + static |
| CSRF | n/a | no state-changing endpoints, no cookies |
| Auth bypass | n/a | no auth |
| Clickjacking | mitigated | frame-ancestors 'none', XFO DENY |
| Supply chain (runtime) | minimal | 4 runtime deps, lockfile-pinned |
| Supply chain (build) | postcss advisories | build-time, no attacker input — §3 |
| Phishing on the domain | real | mail hardening in §6 |
| DDoS | low value target | static, cacheable, tiny origin cost |
| Data breach | nothing to breach | no PII stored; site holds only public data |
| Defacement | via deploy channel | protect the Git host + deploy keys, not the site runtime |

## 9. Verdict

For its class — a static company/marketing site — this is a hardened posture:
minimal runtime dependencies, zero input surface, strict CSP with no third-party
origins, full security headers including on error pages, no cookies or trackers,
no client storage, `security.txt`, and a documented accepted-risk list. The
remaining work is operational: TLS at the edge, DNS/mail records (§6), and the
dependency upgrade routine (§3).

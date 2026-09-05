import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2, Layers3, LifeBuoy, FlaskConical } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { emailLink } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, custom software and ongoing care from Piwas — plus a fixed-price test-automation kickstart for products that already exist.",
};

const kickstartIncludes = [
  "A working end-to-end test suite for your critical flows (Playwright)",
  "CI wired up so the suite runs on every change, with clear reports",
  "A flaky-test cleanup pass and a README your own team can maintain",
  "A short hand-over session so the suite keeps paying rent after we leave",
];

export default function Services() {
  return (
    <main id="main" className="wrap page-shell">
      <PageIntro
        title="What we can make together."
        description="Something new, something better, or something that finally just works. Always starting with a plain conversation about what you actually need."
      />

      <div className="services-grid" style={{ marginTop: 0 }}>
        <article>
          <Globe2 size={32} strokeWidth={1.4} />
          <h3>Websites with character</h3>
          <p>
            A place that feels like your business. Clear, quick and easy to use, on every screen — with the
            boring parts (hosting, domains, updates) handled for you.
          </p>
          <span>Company sites · Portfolios · Web shops</span>
        </article>
        <article>
          <Layers3 size={32} strokeWidth={1.4} />
          <h3>Software that fits</h3>
          <p>
            Web and mobile apps, SaaS products and the integrations between them. Built in short loops so you
            see something real every week, not a big reveal three months in.
          </p>
          <span>SaaS products · Web &amp; mobile apps · Stores</span>
        </article>
        <article>
          <LifeBuoy size={32} strokeWidth={1.4} />
          <h3>Care &amp; keeping it alive</h3>
          <p>
            Software is a plant, not a poster. We host, monitor, back up and keep improving the things we
            build — the same care our own products get.
          </p>
          <span>Hosting · Monitoring · Iterations</span>
        </article>
      </div>

      <div className="product-detail-grid" style={{ marginTop: 30 }}>
        <div className="prose">
          <h2>The test-automation kickstart</h2>
          <p>
            For products that already exist and teams who are tired of finding bugs by accident. In two weeks we
            give your project a working safety net: automated end-to-end tests for the flows your customers
            actually use, running automatically on every change.
          </p>
          <p>
            Fixed price, agreed before we start — most kickstarts land between €3.500 and €5.500, depending on
            how much there is to cover. No retainer attached.
          </p>
          <a
            className="button button-dark"
            style={{ textDecoration: "none" }}
            href={emailLink("Test-automation kickstart — Piwas")}
          >
            Ask about the kickstart <ArrowUpRight size={18} />
          </a>
        </div>
        <aside className="detail-panel">
          <FlaskConical size={30} strokeWidth={1.4} />
          <h2>What two weeks gets you</h2>
          <ul>{kickstartIncludes.map((c) => <li key={c}>{c}</li>)}</ul>
          <p>One product, one fixed price, no surprises.</p>
        </aside>
      </div>

      <div className="prose" style={{ marginTop: 40 }}>
        <h2>How a project goes</h2>
        <p>
          <strong>1 · A first call.</strong> You talk, we listen and ask annoyingly good questions. No deck, no
          invoice.
        </p>
        <p>
          <strong>2 · A written proposal.</strong> Scope, price and timing in plain language. If it doesn’t fit,
          we’ll say so and point you somewhere better if we can.
        </p>
        <p>
          <strong>3 · Short loops.</strong> You see something real every week and steer while steering is still
          cheap.
        </p>
        <p>
          <strong>4 · Launch &amp; care.</strong> We ship, monitor and stick around. Our first products still run
          in production — that’s the whole point.
        </p>
      </div>

      <div className="hero-actions" style={{ marginTop: 40 }}>
        <Link className="button button-dark" href="/contact">Tell us what you have in mind <ArrowUpRight size={20} /></Link>
        <Link className="text-link" href="/#work">See what we’ve built <ArrowUpRight size={18} /></Link>
      </div>
    </main>
  );
}

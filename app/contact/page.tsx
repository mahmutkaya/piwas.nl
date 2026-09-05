import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { company, emailLink } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Let’s talk",
  description: "Talk to Piwas about a website, a software project or help with a Piwas product.",
};

export default function Contact() {
  return (
    <main id="main" className="wrap page-shell">
      <PageIntro
        title="Every good thing starts with a hello."
        description="A new idea, an awkward workflow, a website that needs some love. Tell us what you’re thinking."
      />
      <div className="content-columns">
        <div className="contact-options">
          <a className="contact-email" href={emailLink("Let’s make something — Piwas")}>{company.email}</a>
          <p>
            This opens your email app. A few lines about your idea, timing and budget are plenty to start. We
            usually reply within one working day, Monday to Friday.
          </p>
          <a className="text-link" href={`tel:${company.phoneHref}`}>Or call {company.phone} <ArrowUpRight size={18} /></a>
          <p>
            {company.founder}<br />
            {company.name} · {company.city}, {company.country}
          </p>
          <Link className="text-link" href="/legal/imprint">Full company details</Link>
        </div>
        <aside className="side-note">
          <h2>Already using one of our products?</h2>
          <p>Find product support, privacy information and account-deletion requests in one place.</p>
          <Link className="text-link" href="/support" style={{ marginTop: 22 }}>
            Find help <ArrowUpRight size={18} />
          </Link>
        </aside>
      </div>
    </main>
  );
}

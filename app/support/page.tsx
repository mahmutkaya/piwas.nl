import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { products } from "@/lib/content/products";
import { emailLink } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Product support",
  description: "Get help with Domainio and SofraPiwas, find privacy policies and request account deletion.",
};

export default function Support() {
  return (
    <main id="main" className="wrap page-shell">
      <PageIntro
        title="A human on the other end."
        description="Pick your product for help with your account, billing, privacy or something that isn’t working."
      />
      <div className="link-list">
        {Object.entries(products).map(([slug, p]) => (
          <Link key={slug} href={`/apps/${slug}/support`}>
            <div><h2>{p.name}</h2><p>{p.subtitle}</p></div>
            <ArrowUpRight size={24} />
          </Link>
        ))}
      </div>
      <div className="prose">
        <h2>Something else?</h2>
        <p>
          <a href={emailLink("Piwas support")}>Email Piwas</a> for an existing project or a general question.
          Please don’t send passwords or payment-card details.
        </p>
      </div>
    </main>
  );
}

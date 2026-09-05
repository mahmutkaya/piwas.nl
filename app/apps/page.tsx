import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { products } from "@/lib/content/products";

export const metadata: Metadata = { title: "Apps & product information" };

export default function Apps() {
  return (
    <main id="main" className="wrap page-shell">
      <PageIntro title="Our products. Your everyday." description="Product information, support and privacy for the software made by Piwas." />
      <div className="link-list">
        {Object.entries(products).map(([slug, p]) => (
          <Link key={slug} href={`/apps/${slug}`}>
            <div><h2>{p.name}</h2><p>{p.description}</p></div>
            <span>Explore</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

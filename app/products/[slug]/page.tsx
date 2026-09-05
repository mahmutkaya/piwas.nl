import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProduct, products } from "@/lib/content/products";
import { PageIntro } from "@/components/site/page-intro";

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p?.name ?? "Product not found", description: p?.description };
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    description: p.description,
    url: p.url,
    author: { "@type": "Organization", name: "Piwas" },
  };
  return (
    <main id="main" className="wrap page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageIntro title={p.name} description={p.description} back="/#work" backLabel="All our work" />
      <div className="product-detail-grid">
        <div className="prose">
          <h2>{p.subtitle}</h2>
          <p>{p.story}</p>
          <p>{p.detail}</p>
          <a className="button button-dark" href={p.url} style={{ marginTop: 20, textDecoration: "none" }}>
            Visit {p.name} <ArrowUpRight size={18} />
          </a>
          <div className="inline-links">
            <Link href={`/apps/${slug}/support`}>Product support</Link>
            <Link href={`/apps/${slug}/privacy`}>Privacy policy</Link>
            <Link href={`/apps/${slug}/delete-account`}>Account deletion</Link>
          </div>
        </div>
        <aside className="detail-panel" style={slug === "domainio" ? { background: "#e3d9e9" } : undefined}>
          <h2>What it brings together</h2>
          <ul>{p.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
          <p>Available on the web.</p>
        </aside>
      </div>
    </main>
  );
}

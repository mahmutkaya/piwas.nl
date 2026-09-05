import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piwas.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Piwas — Good software. Human roots.", template: "%s · Piwas" },
  description:
    "An independent software studio in the Netherlands. Thoughtful websites, custom software and SaaS products, including Domainio and SofraPiwas.",
  icons: { icon: "/favicon.svg", apple: "/onion-mark.svg" },
  twitter: {
    card: "summary_large_image",
    title: "Piwas — Good software. Human roots.",
    description:
      "An independent software studio in the Netherlands. Websites, custom software and SaaS products, including Domainio and SofraPiwas.",
    images: ["/images/onion-studio.webp"],
  },
  openGraph: {
    siteName: "Piwas",
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    images: [{ url: "/images/onion-studio.webp", width: 1200, height: 800, alt: "A handmade layered onion, a little purple laptop and green building blocks on a yellow studio desk." }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Piwas",
  url: siteUrl,
  logo: `${siteUrl}/onion-mark.svg`,
  email: "domainio@piwas.nl",
  telephone: "+31686433636",
  founder: { "@type": "Person", name: "Mahmut Kaya" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aulentistraat 159",
    postalCode: "2132 HG",
    addressLocality: "Hoofddorp",
    addressCountry: "NL",
  },
  sameAs: ["https://sofrapiwas.com", "https://domainio.nl"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <script
          type="application/ld+json"
          // JSON-LD values are static config, but escape `<` anyway so a
          // future edit can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <header className="site-header wrap">
          <Link className="wordmark" href="/" aria-label="Piwas home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/onion-mark.svg" width="33" height="36" alt="" />
            piwas<span className="logo-dot">.</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/#work">Our work</Link>
            <Link href="/#services">What we do</Link>
            <Link href="/#about">The studio</Link>
          </nav>
          <Link className="nav-contact" href="/contact">Let’s talk <ArrowUpRight size={18} /></Link>
        </header>
        {children}
        <footer className="site-footer wrap">
          <div className="footer-top">
            <Link href="/" className="wordmark">piwas.</Link>
            <p>Good things have layers.</p>
            <span>Rooted in the Netherlands.</span>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Piwas</span>
            <nav aria-label="Footer navigation">
              <Link href="/support">Support</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/imprint">Company details</Link>
            </nav>
            <span>Made with care (and onions).</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

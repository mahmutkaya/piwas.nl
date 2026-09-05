import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";
import { CompanyDetails } from "@/components/site/company-details";
import { company, emailLink } from "@/lib/content/company";

const pages = {
  imprint: {
    title: "Company details",
    description: "The people and business behind Piwas, Domainio and SofraPiwas.",
  },
  privacy: {
    title: "Privacy policy",
    description: "How this Piwas company website handles your information.",
  },
  terms: {
    title: "Terms & working together",
    description: "Clear expectations for our website, products and project work.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return { title: pages[page as keyof typeof pages]?.title ?? "Page not found" };
}

export default async function Legal({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!Object.hasOwn(pages, page)) notFound();
  const content = pages[page as keyof typeof pages];
  return (
    <main id="main" className="wrap page-shell">
      <PageIntro {...content} />
      <div className="prose">
        {page === "imprint" ? (
          <>
            <CompanyDetails />
            <h2>What Piwas does</h2>
            <p>
              Piwas designs and develops websites, custom software and SaaS applications. Domainio and SofraPiwas
              are products operated by Piwas.
            </p>
            <p>
              For product-specific billing, privacy and support, visit our <Link href="/support">support pages</Link>.
            </p>
          </>
        ) : page === "privacy" ? (
          <>
            <p className="updated">Last updated: 5 September 2026</p>
            <h2>Who is responsible</h2>
            <p>
              {company.name} is responsible for the personal information you share directly with this studio. Our
              address and registration details are on the <Link href="/legal/imprint">company details page</Link>.
              Contact <a href={emailLink("Privacy request — Piwas")}>{company.email}</a> about your data.
            </p>
            <h2>When you visit</h2>
            <p>
              This website does not provide customer accounts, accept payments or add advertising, analytics or
              session-replay scripts. It does not set application cookies or save personal information in your
              browser. Our hosting provider processes technical request information, such as IP addresses and
              browser details, to deliver and protect the website.
            </p>
            <h2>When you contact us</h2>
            <p>
              Email and phone links open your own mail or calling application. Information is sent only when you
              choose to send a message or place a call. We use the contact details and message you provide to
              respond, discuss a project or help with a product. Please send only information relevant to your
              request.
            </p>
            <p>
              We process project enquiries to take steps towards a contract at your request. We process other
              correspondence on the basis of our legitimate interest in responding to you and running the
              business. Where required, we retain records to meet legal obligations.
            </p>
            <h2>Sharing and retention</h2>
            <p>
              Website hosting and email service providers process information needed to deliver those services. We
              do not add advertising tools or sell enquiry data. Correspondence is retained as needed to handle the
              enquiry and any resulting business relationship; legal record-keeping requirements may require some
              records to be kept longer. Contact us to ask about or request deletion of your correspondence.
            </p>
            <h2>Your choices and rights</h2>
            <p>
              You may request access, correction, deletion or portability of your personal data, and may object to
              or ask us to restrict processing where applicable. Email us using the address above. You can also
              complain to the <a href="https://www.autoriteitpersoonsgegevens.nl/en">Dutch Autoriteit Persoonsgegevens</a>{" "}
              or your local supervisory authority.
            </p>
            <h2>Our products have their own policies</h2>
            <p>
              This policy covers the company website, not activity inside Domainio, SofraPiwas or a restaurant’s
              own app. See <Link href="/apps/domainio/privacy">Domainio’s privacy policy</Link> or{" "}
              <Link href="/apps/sofrapiwas/privacy">SofraPiwas’s privacy policy</Link> for product-specific
              information.
            </p>
          </>
        ) : (
          <>
            <p className="updated">Last updated: 5 September 2026</p>
            <h2>Using this website</h2>
            <p>
              This website introduces Piwas and its products and lets you contact us. It is not a checkout or a
              subscription service. Sending an enquiry does not purchase a product or commit you to a project.
            </p>
            <h2>Custom projects</h2>
            <p>
              Scope, price, currency, tax treatment, delivery milestones, ownership, maintenance and payment
              arrangements are set out in the written proposal or agreement for your project. Ask us to clarify
              anything before accepting a proposal.
            </p>
            <h2>Delivery, cancellation and refunds</h2>
            <p>
              Project delivery dates and acceptance criteria depend on the agreed scope. Project cancellation and
              any refund arrangements are governed by your written agreement and applicable law. Contact us with
              your project or invoice reference to discuss a cancellation or refund request.
            </p>
            <p>These pages do not replace your existing contract or remove any mandatory consumer rights.</p>
            <h2>Product purchases</h2>
            <p>
              Current prices, currencies, subscription conditions and payment options are shown on the relevant
              product’s website or in its checkout. <a href="https://domainio.nl/terms">Domainio has its own terms</a>.
              For SofraPiwas, consult your written agreement and{" "}
              <a href="https://sofrapiwas.com/en/legal">product legal information</a>.
            </p>
            <p>
              Account deletion and subscription cancellation are separate requests. When contacting support, say
              whether you want to cancel a subscription, delete an account, or both.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about an agreement, payment or delivery? Email{" "}
              <a href={emailLink("Billing or project question — Piwas")}>{company.email}</a> or visit{" "}
              <Link href="/support">product support</Link>.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

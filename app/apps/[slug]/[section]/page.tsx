import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProduct, products } from "@/lib/content/products";
import { PageIntro } from "@/components/site/page-intro";
import { CompanyDetails } from "@/components/site/company-details";
import { PRIVACY_EN } from "@/lib/content/domainio/privacy.en";
import sofraPrivacy from "@/lib/content/sofra-privacy.json";

const sections = ["support", "privacy", "delete-account"];
type Params = { slug: string; section: string };

export function generateStaticParams() {
  return Object.keys(products).flatMap((slug) => sections.map((section) => ({ slug, section })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, section } = await params;
  const p = getProduct(slug);
  return {
    title: p
      ? `${p.name} ${section === "delete-account" ? "account deletion" : section === "privacy" ? "privacy policy" : "support"}`
      : "Page not found",
  };
}

export default async function AppSection({ params }: { params: Promise<Params> }) {
  const { slug, section } = await params;
  const p = getProduct(slug);
  if (!p || !sections.includes(section)) notFound();
  const label = section === "delete-account" ? "account deletion" : section === "privacy" ? "privacy policy" : "support";
  const mail = `mailto:${p.email}?subject=${encodeURIComponent(
    `${p.name} — ${section === "delete-account" ? "Delete my account and associated personal data" : "Support request"}`,
  )}`;

  return (
    <main id="main" className="wrap page-shell">
      <PageIntro
        title={`${p.name} ${label}`}
        description={
          section === "support"
            ? "Let’s get you back to the good part."
            : section === "privacy"
              ? "How this Piwas product handles your information."
              : "Request deletion of your account and associated personal data."
        }
        back={`/products/${slug}`}
        backLabel={`About ${p.name}`}
      />

      {section === "support" ? (
        <div className="content-columns">
          <div className="prose">
            <h2>Talk to product support</h2>
            <p>
              Write to <a href={mail}>{p.email}</a>. Include your account email, a short description of the issue
              and an invoice or order reference if relevant. Don’t include passwords or payment-card details.
            </p>
            <a className="button button-dark" style={{ textDecoration: "none" }} href={mail}>
              Email support <ArrowUpRight size={18} />
            </a>
            <h2>Accounts and billing</h2>
            <p>
              For login trouble, billing questions, a cancellation or a refund request, contact us above. Tell us
              which action you need so we can help with the right account.
            </p>
            {slug === "sofrapiwas" && (
              <p>
                For a food order, reservation or refund from a restaurant, contact that restaurant directly. Its
                name and contact details are on its menu or receipt.
              </p>
            )}
          </div>
          <aside className="side-note">
            <h2>Your information</h2>
            <div className="inline-links">
              <Link href={`/apps/${slug}/privacy`}>Privacy policy</Link>
              <Link href={`/apps/${slug}/delete-account`}>Request account deletion</Link>
            </div>
            <p>
              Operated by Piwas.<br />
              <Link className="text-link" href="/legal/imprint">Company &amp; contact details</Link>
            </p>
          </aside>
        </div>
      ) : section === "delete-account" ? (
        <div className="prose">
          <h2>Request by email</h2>
          <p>
            Email <a href={mail}>{p.email}</a> with the subject “{p.name} — Delete my account and associated
            personal data”. Use the email address linked to your account if you can. You do not need to install
            or sign in to an app to make this request.
          </p>
          <a className="button button-dark" href={mail} style={{ textDecoration: "none" }}>
            Write a deletion request <ArrowUpRight size={18} />
          </a>
          <p className="updated">
            This opens your email app. Send the email to submit your request; opening this link alone does not
            send anything or delete your account.
          </p>
          <h2>What happens next</h2>
          <p>
            Support may need to verify that you control the account before making changes. Explain if you no
            longer have access to its email address. Ask for deletion of the account and associated personal
            data, rather than temporary deactivation.
          </p>
          <h2>Subscriptions and services</h2>
          <p>
            Tell support if you also want to cancel a subscription. Deleting account data does not automatically
            cancel a subscription billed by an app store.
          </p>
          {slug === "domainio" ? (
            <>
              <p>
                If you have active domains, tell us whether you want to transfer them or stop renewing them.
                Domain ownership and registry obligations need to be handled alongside your account request.
              </p>
              <h2>Records that may need to remain</h2>
              <p>
                Domainio’s policy keeps invoices and payment records for seven years. Domain and registrant
                records are retained for the registration and relevant registry requirements. Security logs and
                diagnostic records have separate retention rules described in the product policy; exact technical
                retention periods should be confirmed with support.
              </p>
            </>
          ) : (
            <>
              <p>
                This request is for your SofraPiwas customer or partner account. Restaurant guest data is
                controlled by the restaurant; contact it using the details on its own menu or receipt.
              </p>
              <h2>Records that may need to remain</h2>
              <p>
                SofraPiwas’s policy retains invoices as required by Dutch tax law and sign-in and administrative
                logs for 18 months. A departed restaurant’s encrypted backup is retained for 24 months unless
                earlier deletion is requested. Rejected partner applications are retained for 12 months.
              </p>
            </>
          )}
          <p>
            Support can explain the scope of deletion, any records that must be retained and the expected
            completion date for your request. See the{" "}
            <Link href={`/apps/${slug}/privacy`}>{p.name} privacy policy</Link> for the current retention
            information.
          </p>
        </div>
      ) : (
        <div className="prose">
          <p className="updated">
            Product policy snapshot reviewed 5 September 2026. Scope: the current {p.name} web service.
          </p>
          <p>
            The <a href={p.privacyUrl}>policy on {p.name}’s website</a> is the maintained product source. For
            deletion requests, use our <Link href={`/apps/${slug}/delete-account`}>account-deletion page</Link>.
          </p>
          {slug === "domainio"
            ? PRIVACY_EN.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.blocks.map((b, i) =>
                    b.kind === "p" ? (
                      <p key={i}>{b.text}</p>
                    ) : b.kind === "ul" ? (
                      <ul key={i}>{b.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    ) : (
                      <CompanyDetails key={i} />
                    ),
                  )}
                </section>
              ))
            : (
              <>
                <h2>Piwas, operator of SofraPiwas</h2>
                <CompanyDetails />
                <p>
                  Product privacy contact: <a href={`mailto:${p.email}`}>{p.email}</a>.
                </p>
                {["controller", "what", "why", "keep", "rights", "cookies"].map((key) => {
                  const s = sofraPrivacy[key as "controller"];
                  return (
                    <section key={key}>
                      <h2>{s.title}</h2>
                      <p>{s.body}</p>
                    </section>
                  );
                })}
                <h2>{sofraPrivacy.processors.title}</h2>
                <p>{sofraPrivacy.processors.body}</p>
                <ul>
                  <li>Netcup GmbH — hosting and databases (Germany)</li>
                  <li>Mollie B.V. — subscription payments (Netherlands)</li>
                  <li>Resend — email delivery (United States)</li>
                  <li>Sentry — error monitoring (EU)</li>
                  <li>
                    GitHub (Microsoft) — code, builds, and restaurant provisioning records including name, city
                    and administrator email (United States)
                  </li>
                </ul>
              </>
            )}
        </div>
      )}

      <div className="inline-links">
        <Link href={`/apps/${slug}/support`}>Support</Link>
        <Link href={`/apps/${slug}/privacy`}>Privacy</Link>
        <Link href={`/apps/${slug}/delete-account`}>Account deletion</Link>
      </div>
    </main>
  );
}

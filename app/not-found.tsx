import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <h1>A missing layer.</h1>
      <p>We couldn’t find that page. Let’s get you somewhere useful.</p>
      <Link href="/" className="button button-dark">Back to Piwas</Link>
    </main>
  );
}

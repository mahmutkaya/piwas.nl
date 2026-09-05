/**
 * Shape of a legal document's copy.
 *
 * Copy lives as data rather than JSX so the Dutch and English versions
 * stay structurally identical and diffable against each other — if a
 * section is added to one language and not the other, it is visible in
 * the type-checked `sections` array rather than buried in markup.
 */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: readonly string[] }
  /** Renders the shared ENTITY details as a definition list. */
  | { kind: "contact" };

export interface LegalSection {
  heading: string;
  blocks: readonly LegalBlock[];
}

export interface LegalDocument {
  title: string;
  /** One-paragraph summary under the h1. */
  lede: string;
  /** ISO date the copy last changed, e.g. "2026-08-10". */
  lastUpdated: string;
  locale: "en" | "nl";
  /** Label for the language toggle, in the *other* language. */
  altLabel: string;
  /** Route of the other-language version. */
  altHref: string;
  sections: readonly LegalSection[];
}

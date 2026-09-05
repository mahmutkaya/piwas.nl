// Public business details. KVK/VAT as registered; address follows the 2026
// municipality renumbering (Saturnusstraat 93 → Aulentistraat 159).
export const company = {
  name: "Piwas",
  founder: "Mahmut Kaya",
  email: "domainio@piwas.nl",
  phone: "+31 6 86433636",
  phoneHref: "+31686433636",
  street: "Aulentistraat 159",
  postalCode: "2132 HG",
  city: "Hoofddorp",
  country: "Netherlands",
  kvk: "95898115",
  vat: "NL005177244B88",
  legalForm: null,
} as const;

export const emailLink = (subject: string) =>
  `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;

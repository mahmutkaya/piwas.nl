import { company, emailLink } from "@/lib/content/company";

export function CompanyDetails() {
  return (
    <dl className="info-list">
      <dt>Registered name</dt>
      <dd>{company.name}</dd>
      <dt>Contact person</dt>
      <dd>{company.founder}</dd>
      <dt>Business address</dt>
      <dd>{company.street}<br />{company.postalCode} {company.city}<br />{company.country}</dd>
      <dt>Chamber of Commerce</dt>
      <dd>KVK {company.kvk}</dd>
      <dt>VAT identification</dt>
      <dd>{company.vat}</dd>
      <dt>Email</dt>
      <dd><a href={emailLink("Piwas enquiry")}>{company.email}</a></dd>
      <dt>Phone</dt>
      <dd><a href={`tel:${company.phoneHref}`}>{company.phone}</a></dd>
    </dl>
  );
}

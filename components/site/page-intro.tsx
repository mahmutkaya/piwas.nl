import Link from "next/link";

export function PageIntro({
  title,
  description,
  back = "/",
  backLabel = "Back to the studio",
}: {
  title: string;
  description: string;
  back?: string;
  backLabel?: string;
}) {
  return (
    <div className="page-intro">
      <Link className="breadcrumb" href={back}>{backLabel}</Link>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

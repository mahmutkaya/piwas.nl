import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piwas.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/contact",
    "/support",
    "/apps",
    "/products/sofrapiwas",
    "/products/domainio",
    "/apps/sofrapiwas",
    "/apps/sofrapiwas/support",
    "/apps/sofrapiwas/privacy",
    "/apps/sofrapiwas/delete-account",
    "/apps/domainio",
    "/apps/domainio/support",
    "/apps/domainio/privacy",
    "/apps/domainio/delete-account",
    "/legal/privacy",
    "/legal/terms",
    "/legal/imprint",
  ];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

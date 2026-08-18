import logoUrl from "../../assets/club-logos/maspalomasrc.png";
import type { SiteConfig } from "../../application/siteConfig";
import { canonicalUrl, type SeoRoute } from "./seoConfig";

export function createStructuredData(route: SeoRoute, siteConfig: SiteConfig) {
  const canonical = canonicalUrl(route.path, siteConfig);
  const schema = route.schema as Record<string, unknown>;
  if (route.path === "/") {
    return { "@context": "https://schema.org", "@type": schema.type, "@id": `${siteConfig.siteUrl}/#club`, name: schema.name, url: canonical, logo: new URL(logoUrl, siteConfig.siteUrl).toString(), sport: schema.sport, email: schema.email, address: { "@type": "PostalAddress", streetAddress: schema.streetAddress, addressLocality: schema.addressLocality, postalCode: schema.postalCode, addressRegion: schema.addressRegion, addressCountry: schema.addressCountry }, sameAs: schema.sameAs };
  }
  if (schema.type === "Course") {
    return {
      "@context": "https://schema.org",
      "@type": schema.type,
      name: schema.name,
      description: schema.description,
      provider: { "@id": `${siteConfig.siteUrl}/#club` },
      courseMode: schema.courseMode,
      about: schema.about,
      ...(schema.location ? { location: { "@type": "Place", name: schema.location } } : {}),
      url: canonical
    };
  }
  return { "@context": "https://schema.org", "@type": schema.type || "WebPage", name: route.title, description: route.description, url: canonical, isPartOf: { "@id": `${siteConfig.siteUrl}/#club` } };
}

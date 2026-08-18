import { useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { canonicalUrl, getSeoRoute } from "./seoConfig";
import { createStructuredData } from "./structuredData";
import type { SiteConfig } from "../../application/siteConfig";

export default function Seo({ siteConfig }: { siteConfig: SiteConfig }) {
  const route = getSeoRoute(useLocation().pathname);
  const canonical = canonicalUrl(route.path, siteConfig);
  return <Head>
    <title>{route.title}</title>
    <meta name="description" content={route.description} />
    <meta property="og:title" content={route.title} />
    <meta property="og:description" content={route.description} />
    <meta property="og:url" content={canonical} />
    <link rel="canonical" href={canonical} />
    {!route.indexable && <meta name="robots" content="noindex,follow" />}
    <script type="application/ld+json">{JSON.stringify(createStructuredData(route, siteConfig))}</script>
  </Head>;
}

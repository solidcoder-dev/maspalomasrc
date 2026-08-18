import routes from "./seoRoutes.json";
import type { SiteConfig } from "../../application/siteConfig";

export type SeoRoute = (typeof routes)[number];

export const normalizeRoute = (pathname: string) => pathname.replace(/\/$/, "") || "/";
export const seoRoutes = routes as SeoRoute[];

export const canonicalUrl = (path: string, siteConfig: SiteConfig) =>
  `${siteConfig.siteUrl}${path === "/" ? "/" : `${path}/`}`;

export function getSeoRoute(pathname: string): SeoRoute {
  return seoRoutes.find(({ path }) => path === normalizeRoute(pathname)) || seoRoutes[0];
}

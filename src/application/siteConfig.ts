export type SiteConfig = {
  siteUrl: string;
  basePath: string;
};

export function createSiteConfig(env: Record<string, string | undefined>): SiteConfig {
  const siteUrl = (env.VITE_SITE_URL || "https://solidcoder-dev.github.io/maspalomasrc").replace(/\/$/, "");
  const tenant = (env.VITE_TENANT || "default").toLowerCase();
  const basePath = env.VITE_BASE_PATH || `/${tenant}/`;
  return { siteUrl, basePath: basePath.endsWith("/") ? basePath : `${basePath}/` };
}

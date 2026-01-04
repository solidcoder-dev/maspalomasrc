import { Club, type ClubDTO } from "../domain/club";
import type { ClubPort } from "../ports/club-port";

const clubFiles = import.meta.glob("../data/*.json");
const logoFiles = import.meta.glob("../assets/club-logos/*", {
  eager: true,
  as: "url"
});

const resolveLogoUrl = (logoFile?: string) => {
  if (!logoFile) return undefined;
  const path = `../assets/club-logos/${logoFile}`;
  return logoFiles[path] as string | undefined;
};

export function createJsonClubAdapter(tenant: string): ClubPort {
  const normalizedTenant = (tenant || "").trim().toLowerCase();
  const path = `../data/${normalizedTenant || "default"}.json`;
  const fallback = "../data/default.json";
  const loader = clubFiles[path] ?? clubFiles[fallback];

  if (!loader) {
    throw new Error("No se encontraron archivos de datos para clubes.");
  }

  async function getClub(): Promise<Club> {
    const module = (await loader()) as { default: unknown };
    const dto = module.default as ClubDTO & { logoFile?: string };
    return Club.fromDTO({
      ...dto,
      logoUrl: resolveLogoUrl(dto.logoFile)
    });
  }

  return { getClub };
}

import { Club, type ClubDTO } from "../domain/club";
import type { ClubPort } from "../ports/club-port";

const clubFiles = import.meta.glob("../data/*.json");

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
    return Club.fromDTO(module.default as ClubDTO);
  }

  return { getClub };
}

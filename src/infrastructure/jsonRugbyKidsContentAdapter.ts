import type {
  RugbyKidsCtaDTO,
  RugbyKidsInsuranceDTO,
  RugbyKidsIntroDTO,
  RugbyKidsPricingDTO,
  RugbyKidsScheduleDTO
} from "../domain/rugbyKids";
import type { RugbyKidsContentPort } from "../ports/rugby-kids-content-port";

const rugbyKidsFiles = import.meta.glob("../assets/rugby-kids/*.json");

const loadJson = async <T,>(name: string): Promise<T> => {
  const path = `../assets/rugby-kids/${name}.json`;
  const loader = rugbyKidsFiles[path];
  if (!loader) {
    throw new Error(`No se encontró el contenido de Rugby Kids: ${name}`);
  }
  const module = (await loader()) as { default: unknown };
  return module.default as T;
};

export function createJsonRugbyKidsContentAdapter(): RugbyKidsContentPort {
  return {
    getIntro: () => loadJson<RugbyKidsIntroDTO>("intro"),
    getSchedule: () => loadJson<RugbyKidsScheduleDTO>("schedule"),
    getPricing: () => loadJson<RugbyKidsPricingDTO>("pricing"),
    getInsurance: () => loadJson<RugbyKidsInsuranceDTO>("insurance"),
    getCta: () => loadJson<RugbyKidsCtaDTO>("cta")
  };
}

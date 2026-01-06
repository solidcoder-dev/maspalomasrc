import type {
  AulaApproachDTO,
  AulaAudienceDTO,
  AulaCtaDTO,
  AulaIntroDTO,
  AulaPartnershipDTO,
  AulaSocialsDTO,
  AulaTrainingDTO
} from "../domain/aula";
import type { AulaContentPort } from "../ports/aula-content-port";

const aulaFiles = import.meta.glob("../assets/aula/*.json");

const loadJson = async <T,>(name: string): Promise<T> => {
  const path = `../assets/aula/${name}.json`;
  const loader = aulaFiles[path];
  if (!loader) {
    throw new Error(`No se encontró el endpoint del aula: ${name}`);
  }
  const module = (await loader()) as { default: unknown };
  return module.default as T;
};

export function createJsonAulaContentAdapter(): AulaContentPort {
  async function getIntro() {
    return loadJson<AulaIntroDTO>("intro");
  }

  async function getAudience() {
    return loadJson<AulaAudienceDTO>("audience");
  }

  async function getTraining() {
    return loadJson<AulaTrainingDTO>("training");
  }

  async function getApproach() {
    return loadJson<AulaApproachDTO>("approach");
  }

  async function getPartnership() {
    return loadJson<AulaPartnershipDTO>("partnership");
  }

  async function getCta() {
    return loadJson<AulaCtaDTO>("cta");
  }

  async function getSocials() {
    return loadJson<AulaSocialsDTO>("socials");
  }

  return {
    getIntro,
    getAudience,
    getTraining,
    getApproach,
    getPartnership,
    getCta,
    getSocials
  };
}

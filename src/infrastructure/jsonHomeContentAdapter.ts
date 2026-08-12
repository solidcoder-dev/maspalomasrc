import type {
  HomeCompetitionDTO,
  HomeCtaDTO,
  HomeInclusionDTO,
  HomeIntroDTO,
  HomePartnershipDTO,
  HomeRugbyKidsPromoDTO,
  HomeSponsorsDTO,
  HomeSocialsDTO,
  HomeTrainingDTO,
  HomeValuesDTO
} from "../domain/home";
import type { HomeContentPort } from "../ports/home-content-port";

const homeFiles = import.meta.glob("../assets/home/*.json");

const loadJson = async <T,>(name: string): Promise<T> => {
  const path = `../assets/home/${name}.json`;
  const loader = homeFiles[path];
  if (!loader) {
    throw new Error(`No se encontró el endpoint de home: ${name}`);
  }
  const module = (await loader()) as { default: unknown };
  return module.default as T;
};

export function createJsonHomeContentAdapter(): HomeContentPort {
  async function getIntro() {
    return loadJson<HomeIntroDTO>("intro");
  }

  async function getRugbyKidsPromo() {
    return loadJson<HomeRugbyKidsPromoDTO>("rugby-kids");
  }

  async function getPartnership() {
    return loadJson<HomePartnershipDTO>("partnership");
  }

  async function getValues() {
    return loadJson<HomeValuesDTO>("values");
  }

  async function getCompetition() {
    return loadJson<HomeCompetitionDTO>("competition");
  }

  async function getTraining() {
    return loadJson<HomeTrainingDTO>("training");
  }

  async function getInclusion() {
    return loadJson<HomeInclusionDTO>("inclusion");
  }

  async function getSponsors() {
    return loadJson<HomeSponsorsDTO>("sponsors");
  }

  async function getCta() {
    return loadJson<HomeCtaDTO>("cta");
  }

  async function getSocials() {
    return loadJson<HomeSocialsDTO>("socials");
  }

  return {
    getIntro,
    getRugbyKidsPromo,
    getPartnership,
    getValues,
    getCompetition,
    getTraining,
    getInclusion,
    getSponsors,
    getCta,
    getSocials
  };
}

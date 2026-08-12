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

export type HomeContentPort = {
  getIntro: () => Promise<HomeIntroDTO>;
  getRugbyKidsPromo: () => Promise<HomeRugbyKidsPromoDTO>;
  getPartnership: () => Promise<HomePartnershipDTO>;
  getValues: () => Promise<HomeValuesDTO>;
  getCompetition: () => Promise<HomeCompetitionDTO>;
  getTraining: () => Promise<HomeTrainingDTO>;
  getInclusion: () => Promise<HomeInclusionDTO>;
  getSponsors: () => Promise<HomeSponsorsDTO>;
  getCta: () => Promise<HomeCtaDTO>;
  getSocials: () => Promise<HomeSocialsDTO>;
};

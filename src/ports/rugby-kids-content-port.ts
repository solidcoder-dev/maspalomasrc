import type {
  RugbyKidsCtaDTO,
  RugbyKidsInsuranceDTO,
  RugbyKidsIntroDTO,
  RugbyKidsPricingDTO,
  RugbyKidsScheduleDTO
} from "../domain/rugbyKids";

export type RugbyKidsContentPort = {
  getIntro: () => Promise<RugbyKidsIntroDTO>;
  getSchedule: () => Promise<RugbyKidsScheduleDTO>;
  getPricing: () => Promise<RugbyKidsPricingDTO>;
  getInsurance: () => Promise<RugbyKidsInsuranceDTO>;
  getCta: () => Promise<RugbyKidsCtaDTO>;
};

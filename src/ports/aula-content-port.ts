import type {
  AulaApproachDTO,
  AulaAudienceDTO,
  AulaCtaDTO,
  AulaIntroDTO,
  AulaPartnershipDTO,
  AulaSocialsDTO,
  AulaTrainingDTO
} from "../domain/aula";

export type AulaContentPort = {
  getIntro: () => Promise<AulaIntroDTO>;
  getAudience: () => Promise<AulaAudienceDTO>;
  getTraining: () => Promise<AulaTrainingDTO>;
  getApproach: () => Promise<AulaApproachDTO>;
  getPartnership: () => Promise<AulaPartnershipDTO>;
  getCta: () => Promise<AulaCtaDTO>;
  getSocials: () => Promise<AulaSocialsDTO>;
};

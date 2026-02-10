import type {
  JoinEnrollmentDTO,
  JoinFeesDTO,
  JoinIntroDTO
} from "../domain/joinContent";

export type JoinContentPort = {
  getIntro: () => Promise<JoinIntroDTO>;
  getFees: () => Promise<JoinFeesDTO>;
  getEnrollment: () => Promise<JoinEnrollmentDTO>;
};

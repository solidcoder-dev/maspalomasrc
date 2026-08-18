import type { AulaContentPort } from "../ports/aula-content-port";
import type { ClubPort } from "../ports/club-port";
import type { HomeContentPort } from "../ports/home-content-port";
import type { JoinContentPort } from "../ports/join-content-port";
import type { RugbyKidsContentPort } from "../ports/rugby-kids-content-port";
import type { ContactMessage } from "./contact/submitContactUseCase";
import type { SiteConfig } from "./siteConfig";

export type SubmitContactUseCase = (values: ContactMessage) => Promise<void>;

export type AppDependencies = {
  siteConfig: SiteConfig;
  clubPort: ClubPort;
  homeContentPort: HomeContentPort;
  aulaContentPort: AulaContentPort;
  joinContentPort: JoinContentPort;
  rugbyKidsContentPort: RugbyKidsContentPort;
  submitContactUseCase: SubmitContactUseCase;
};

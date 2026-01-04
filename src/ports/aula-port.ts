import type { AulaInfo } from "../domain/aula";

export type AulaPort = {
  getAula: () => Promise<AulaInfo>;
};

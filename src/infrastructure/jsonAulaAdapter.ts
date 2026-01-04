import { AulaInfo, type AulaDTO } from "../domain/aula";
import type { AulaPort } from "../ports/aula-port";

const aulaFiles = import.meta.glob("../data/aula.json");

export function createJsonAulaAdapter(): AulaPort {
  const loader = aulaFiles["../data/aula.json"];
  if (!loader) {
    throw new Error("No se encontró el archivo de Aula.");
  }

  async function getAula(): Promise<AulaInfo> {
    const module = (await loader()) as { default: unknown };
    return AulaInfo.fromDTO(module.default as AulaDTO);
  }

  return { getAula };
}

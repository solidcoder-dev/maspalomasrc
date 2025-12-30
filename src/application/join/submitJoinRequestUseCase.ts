import type { Club } from "../../domain/club";
import type { JoinRequestValues } from "./joinRequestPresenter";
import type { SepaMandatePort } from "../../ports/sepa-mandate-port";
import type { JoinRequestStoragePort } from "../../ports/join-request-storage-port";
import type { ClientContextPort } from "../../ports/client-context-port";
import type { MandatePdfPort } from "../../ports/mandate-pdf-port";
import { createSepaMandateUseCase } from "./createSepaMandateUseCase";

type SubmitJoinRequestParams = {
  values: JoinRequestValues;
  club: Club;
  sepaMandatePort: SepaMandatePort;
  storagePort: JoinRequestStoragePort;
  clientContextPort: ClientContextPort;
  mandatePdfPort: MandatePdfPort;
};

export const createSubmitJoinRequestUseCase =
  (ports: Omit<SubmitJoinRequestParams, "values" | "club">) =>
  async ({ values, club }: Pick<SubmitJoinRequestParams, "values" | "club">) => {
    const { sepaMandatePort, storagePort, clientContextPort, mandatePdfPort } =
      ports;
  const mandate = await createSepaMandateUseCase({
    values,
    club,
    sepaMandatePort,
    clientContextPort
  });
  storagePort.save({
    player: values,
    mandate,
    savedAt: new Date().toISOString()
  });
  const pdfDataUrl = mandatePdfPort.toDataUrl(mandate);

  return { mandate, pdfDataUrl };
};

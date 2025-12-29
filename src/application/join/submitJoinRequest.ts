import type { Club } from "../../domain/club";
import type { JoinRequestValues } from "./joinRequestPresenter";
import type { SepaMandatePort } from "../../ports/sepa-mandate-port";
import type { JoinRequestStoragePort } from "../../ports/join-request-storage-port";
import { createSepaMandate } from "./createSepaMandate";

type SubmitJoinRequestParams = {
  values: JoinRequestValues;
  club: Club;
  sepaMandatePort: SepaMandatePort;
  storagePort: JoinRequestStoragePort;
};

export const submitJoinRequest = ({
  values,
  club,
  sepaMandatePort,
  storagePort
}: SubmitJoinRequestParams) => {
  const mandate = createSepaMandate({ values, club, sepaMandatePort });
  storagePort.save({
    player: values,
    mandate,
    savedAt: new Date().toISOString()
  });

  return mandate;
};

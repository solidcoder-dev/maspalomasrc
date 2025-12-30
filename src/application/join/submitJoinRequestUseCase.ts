import type { Club } from "../../domain/club";
import type { JoinRequestValues } from "./joinRequestPresenter";
import type { SepaMandatePort } from "../../ports/sepa-mandate-port";
import type { JoinRequestStoragePort } from "../../ports/join-request-storage-port";
import type { ClientContextPort } from "../../ports/client-context-port";
import type { NotificationPort } from "../../ports/notification-port";
import type { TemplateRendererPort } from "../../ports/template-renderer-port";
import { createSepaMandateUseCase } from "./createSepaMandateUseCase";

type SubmitJoinRequestParams = {
  values: JoinRequestValues;
  club: Club;
  sepaMandatePort: SepaMandatePort;
  storagePort: JoinRequestStoragePort;
  clientContextPort: ClientContextPort;
  notificationPort: NotificationPort;
  templateRendererPort: TemplateRendererPort;
};

export const submitJoinRequestUseCase = async ({
  values,
  club,
  sepaMandatePort,
  storagePort,
  clientContextPort,
  notificationPort,
  templateRendererPort
}: SubmitJoinRequestParams) => {
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

  const formattedAmount = Number.parseFloat(values.importe || "0").toFixed(2);
  const chargeDate = new Date();
  chargeDate.setDate(chargeDate.getDate() + 7);
  const formattedDate = chargeDate.toLocaleDateString("es-ES");
  const ibanClean = values.iban.replace(/\s+/g, "");
  const ibanMasked =
    ibanClean.length > 6
      ? `${ibanClean.slice(0, 2)}${"*".repeat(ibanClean.length - 6)}${ibanClean.slice(-4)}`
      : ibanClean;
  const message = templateRendererPort.render({
    name: values.titularNombre,
    date: formattedDate,
    amount: formattedAmount,
    iban: ibanMasked,
    creditor: club.sepaCreditorId,
    mandateReference: mandate.mandateReference,
    clubName: club.name
  });

  await notificationPort.notify({
    title: "Aviso de cargo SEPA",
    message,
    recipientEmail: values.titularEmail
  });

  return mandate;
};

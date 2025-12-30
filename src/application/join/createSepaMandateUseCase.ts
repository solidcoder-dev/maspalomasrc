import type { Club } from "../../domain/club";
import type { SepaMandate } from "../../domain/sepa/mandate";
import type { SepaMandatePort } from "../../ports/sepa-mandate-port";
import type { JoinRequestValues } from "./joinRequestPresenter";
import type { ClientContextPort } from "../../ports/client-context-port";

type CreateSepaMandateParams = {
  values: JoinRequestValues;
  club: Club;
  sepaMandatePort: SepaMandatePort;
  clientContextPort: ClientContextPort;
};

export const createSepaMandateUseCase = async ({
  values,
  club,
  sepaMandatePort,
  clientContextPort
}: CreateSepaMandateParams): Promise<SepaMandate> => {
  const debtorAddressParts = [
    values.titularDireccion,
    [values.titularCodigoPostal, values.titularLocalizacion]
      .filter(Boolean)
      .join(" ")
  ].filter(Boolean);
  const clientContext = await clientContextPort.getClientContext();

  return sepaMandatePort.createMandate({
    clubName: club.name,
    clubAddress: club.address,
    sepaCreditorId: club.sepaCreditorId,
    debtorName: values.titularNombre,
    debtorEmail: values.titularEmail,
    debtorIban: values.iban,
    debtorAddress: debtorAddressParts.join(", "),
    amount: Number.parseFloat(values.importe || "0"),
    currency: "EUR",
    consent: values.acceptSepaMandate,
    signatureDataUrl: values.signatureDataUrl,
    mandateType: "CORE",
    frequency: "MONTHLY",
    sequenceType: "RCUR",
    signedFromIp: clientContext.ipAddress,
    signedUserAgent: clientContext.userAgent
  });
};

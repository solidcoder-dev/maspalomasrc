export type SepaMandateInput = {
  clubName: string;
  clubAddress: string;
  sepaCreditorId: string;
  debtorName: string;
  debtorEmail: string;
  debtorIban: string;
  debtorAddress: string;
  amount: number;
  currency: string;
  consent: boolean;
  signatureDataUrl: string;
  mandateType: "CORE";
  frequency: "MONTHLY";
  sequenceType: "RCUR";
  signedFromIp: string;
  signedUserAgent: string;
};

export type SepaMandate = SepaMandateInput & {
  mandateReference: string;
  signedAt: string;
};

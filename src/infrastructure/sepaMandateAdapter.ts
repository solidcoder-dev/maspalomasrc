import type { SepaMandatePort } from "../ports/sepa-mandate-port";
import type { SepaMandate, SepaMandateInput } from "../domain/sepa/mandate";

const createMandateReference = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(16).slice(2, 10);
  return `MANDATE-${Date.now()}-${random}`;
};

export function createSepaMandateAdapter(): SepaMandatePort {
  const createMandate = (input: SepaMandateInput): SepaMandate => {
    return {
      ...input,
      mandateReference: createMandateReference(),
      signedAt: new Date().toISOString()
    };
  };

  return { createMandate };
}

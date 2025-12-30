import type { SepaMandate } from "../domain/sepa/mandate";

export interface MandatePdfPort {
  download(mandate: SepaMandate): void;
}

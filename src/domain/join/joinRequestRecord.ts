import type { JoinRequestValues } from "./joinRequestTypes";
import type { SepaMandate } from "../sepa/mandate";

export type JoinRequestRecord = {
  player: JoinRequestValues;
  mandate: SepaMandate;
  savedAt: string;
};

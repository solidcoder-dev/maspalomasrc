import { Club } from "../domain/club";

export interface ClubPort {
  getClub(): Promise<Club>;
}

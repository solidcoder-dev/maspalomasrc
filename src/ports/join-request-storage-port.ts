import type { JoinRequestRecord } from "../domain/join/joinRequestRecord";

export interface JoinRequestStoragePort {
  save(record: JoinRequestRecord): void;
}

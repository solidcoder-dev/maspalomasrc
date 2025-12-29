import type { JoinRequestRecord } from "../domain/join/joinRequestRecord";
import type { JoinRequestStoragePort } from "../ports/join-request-storage-port";

const STORAGE_KEY = "club-ui:join-request";

export function createLocalStorageJoinRequestAdapter(): JoinRequestStoragePort {
  const save = (record: JoinRequestRecord) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  };

  return { save };
}

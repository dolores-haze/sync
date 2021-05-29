import { getRepository } from "typeorm";
import { Sync } from "../db/sync";
import { UserStoreResponse } from "../types";

export const createSync = async(): Promise<Sync> => {
  const sync = new Sync();
  return getRepository(Sync).save({
    ...sync,
    status: 'InProgress',
    percent_complete: '0',
    errors: { errors: []}
  });
};

export const onJobCompleted = async (
  job: { id: any; },
  result: UserStoreResponse
) => {
  const syncRepository = getRepository(Sync);
  const sync = await syncRepository.findOne({ id: result.syncId });

  if (!sync) {
    return;
  }

  sync.status = 'Finished';
  sync.percent_complete = '100';
  sync.errors = { ...result };
  return syncRepository.save({ ...sync });
};

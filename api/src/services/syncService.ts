import { getRepository } from "typeorm";
import { Sync } from "../models/sync";
import { SyncError } from "../types";

export const onJobProgress = async (progress: {
  syncId: string, processed: number, total: number, errors: SyncError[]
}) => {
  const syncRepository = getRepository(Sync);
  const sync = await syncRepository.findOne({ id: progress.syncId });

  if (!sync) {
    return;
  }

  const percentage = progress.total < 1 ? 1 : (progress.processed / progress.total);
  sync.percent_complete = `${Math.round(percentage * 100)}`;
  sync.errors = { ...progress };
  return syncRepository.save({ ...sync });
};

export const getLatestSync = async(): Promise<Sync | undefined> => {
  return getRepository(Sync).findOne({ order: { created_at: 'DESC' } });
};

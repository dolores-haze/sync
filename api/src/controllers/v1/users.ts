import {
  Controller,
  SyncStatus
} from '../../types';
import { startSync } from '../../services/userQueue';
import { getAllUsers } from '../../services/userService';
import { getLatestSync } from '../../services/syncService';

export const beginSync: Controller = async (req, res) => {
  const syncResult = await startSync();

  res.status(200).send(syncResult);
};

export const getSyncStatus: Controller = async(req, res) => {
  const sync = await getLatestSync();

  let message: string | SyncStatus;
  if (sync) {
    message = {
      status: sync.status,
      percentComplete: sync.percent_complete,
      errors: sync!.errors.errors
    };
  } else {
    message = 'No syncs yet';
  }
  res.status(200).send(message);
};

export const getSyncedUsers: Controller = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users.map((u) => {
    return {
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      external_id: u.external_id,
      gravatar: u.gravatar
    };
  }));
};

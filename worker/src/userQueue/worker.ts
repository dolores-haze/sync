import { fetchUsers } from '../services/apiClient';
import { createSync } from '../services/syncService';
import {
  generateInternalUser,
  createUser,
  updateUser
} from '../services/userService';

import {
  UserData,
  ExternalUser,
  UserStoreResponse
} from '../types';
  
// Bee-Queue worker
export const userWorker = async (job: any, done: any) => {
  const { users, errors } = await fetchUsers();

  if (errors.length > 0) {
    return errors;
  }
  return storeUsers(job, users);
};
  
// Process and store user data
const storeUsers = async (
  job: any, users: ExternalUser[]
): Promise<UserStoreResponse> => {
  const sync = await createSync();
  const response: UserStoreResponse = { syncId: sync.id, errors: [] };
  let processed = 0;
  let timestamp: Date = new Date();
  const total = users.length;

  console.log(
    `${timestamp.toLocaleString()} | Processing users in syncID ${response.syncId}`
  );
  for (const u of users) {
    u.sync_id = response.syncId;
    const user: UserData = await generateInternalUser(u);

    try {
      const update = await updateUser(user);
    } catch (error) {
      if (error.message === `User with email ${u.email} does not exist`) {
        await createUser(user);
      } else {
        response.errors.push({ external_id: `${u.id}`, message: error.message });
      }
    }

    processed++;
    job.reportProgress({
      syncId: response.syncId,
      errors: response.errors,
      processed,
      total
    });
  }

  timestamp = new Date();
  console.log(
    `${timestamp.toLocaleString()} | Finished processing users in syncID ${response.syncId}`
  );
  return Promise.resolve(response);
};

import thousands from './thousands.json';

import { ExternalUserResponse } from '../types';

export const fetchUsers = async (): Promise<ExternalUserResponse> => {
  const externalUsers = thousands;

  console.log(`Fetched ${externalUsers.length} users from source`);
  return Promise.resolve({
    users: externalUsers,
    errors: []
  });
}

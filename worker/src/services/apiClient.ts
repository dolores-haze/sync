import axios from 'axios';

import {
  ExternalUser,
  ExternalUserResponse
} from '../types';

const SOURCE_API_URL: string = 'https://api.mocki.io/v2/41c09f79/v1/users';

export const fetchUsers = async (): Promise<ExternalUserResponse> => {
  let response: any, externalUsers: ExternalUser[];

  try {
    response = await axios.get(SOURCE_API_URL);
    externalUsers = JSON.parse(`[${response.data}]`);
  } catch {
    return Promise.resolve({
      users: [],
      errors: ['Error fetching users from source']
    });
  }

  console.log(`Fetched ${externalUsers.length} users from source`);
  return Promise.resolve({
    users: externalUsers,
    errors: []
  });
}

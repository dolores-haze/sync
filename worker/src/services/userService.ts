import { Md5 } from 'ts-md5/dist/md5';
import axios from 'axios';

import {
  UserData,
  ExternalUser
} from '../types';

import { User } from '../db/user';
import { getRepository } from 'typeorm';

const GRAVATAR_URL = 'https://gravatar.com/avatar/';

const getGravatar = async (email: string): Promise<string | undefined> => {
  let url: string | undefined = GRAVATAR_URL + `${Md5.hashStr(email)}?d=404`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      url = undefined
    }
  } catch {
    url = undefined;
  } finally {
    return Promise.resolve(url);
  }
};

export const generateInternalUser = async (
  externalUser: ExternalUser
): Promise<UserData> => {
  const name = externalUser.name.split(' ');

  const gravatar = await getGravatar(externalUser.email);

  const user: UserData = {
    first_name: name[0],
    last_name: name[1],
    email: externalUser.email,
    external_id: `${externalUser.id}`,
    gravatar,
    last_sync_id: externalUser.sync_id!
  };

  return user;
};

// DB Access
export const createUser = async (data: UserData): Promise<User> => {
  const user = new User();

  return getRepository(User).save({
    ...user,
    ...data
  });
};

export const updateUser = async (data: UserData): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email: data.email });

  if (!user) {
    throw new Error(`User with email ${data.email} does not exist`);
  }
  if (user.last_sync_id === data.last_sync_id) {
    throw new Error(
      `User with email ${data.email} already updated in this sync`
    );
  }

  user.first_name = data.first_name;
  user.last_name = data.last_name;
  user.external_id = data.external_id;
  user.gravatar = data.gravatar || '';
  user.last_sync_id = data.last_sync_id;
  user.updated_at = new Date();
  return userRepository.save({
    ...user
  });
};

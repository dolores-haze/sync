import { getRepository } from "typeorm";

import { User } from "./../models/user";

export const getAllUsers = async (): Promise<Array<User>> => {
  return getRepository(User).find();
};

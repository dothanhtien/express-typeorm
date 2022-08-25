import { userRepository } from "../database/repositories";
import { InternalServerErrorException } from "../utils/exceptions";

export const getUsers = async () => {
  try {
    return await userRepository.find();
  } catch (err) {
    throw new InternalServerErrorException();
  }
};

export const getUserById = async (id: number) => {
  try {
    return await userRepository.findOneBy({ id });
  } catch (err) {
    throw new InternalServerErrorException();
  }
};

import { User } from "../database/entities/user";
import { userRepository } from "../database/repositories";
import { InternalServerErrorException } from "../utils/exceptions";

export const checkUserExistsByEmail = async (email: string) => {
  try {
    const count = await userRepository.countBy({ email });

    return count > 0;
  } catch (err) {
    throw new InternalServerErrorException();
  }
};

export const createUser = async (input: User) => {
  try {
    const newUser = userRepository.create(input);
    const result = await userRepository.save(newUser);

    return result;
  } catch (err) {
    throw new InternalServerErrorException();
  }
};

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

export const getUserByEmail = async (email: string) => {
  try {
    return await userRepository.findOneBy({ email });
  } catch (err) {
    throw new InternalServerErrorException();
  }
};

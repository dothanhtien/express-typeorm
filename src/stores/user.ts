import { User } from "../database/entities/user";
import { userRepository } from "../database/repositories";

export const checkUserExistsByEmail = async (email: string) => {
  const count = await userRepository.countBy({ email });
  return count > 0;
};

export const createUser = async (input: User) => {
  const newUser = userRepository.create(input);
  const result = await userRepository.save(newUser);

  return result;
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  return await userRepository.findOneBy({ id });
};

export const getUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

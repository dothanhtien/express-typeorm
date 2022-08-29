import { userRepository } from "../database/repositories";
import { transformtoUserModel } from "../requests";
import { UserResponse } from "../responses";

export const checkUserExistsById = async (id: number) => {
  const count = await userRepository.countBy({ id });
  return count > 0;
};

export const checkUserExistsByEmail = async (email: string) => {
  const count = await userRepository.countBy({ email });
  return count > 0;
};

export const createUser = async (input: UserResponse) => {
  const mappedData = transformtoUserModel(input);
  const newUser = userRepository.create(mappedData);
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

export const deleteUserById = async (id: number) => {
  const result = await userRepository.delete(id);
  return result;
};

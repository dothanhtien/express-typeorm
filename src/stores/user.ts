import { userRepository } from "../database/repositories";

export const getUserById = async (id: number) => {
  try {
    return await userRepository.findOneBy({ id });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

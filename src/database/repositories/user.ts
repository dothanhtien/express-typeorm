import { appDataSource } from "../app-data-source";
import { User } from "../entities/user";

export const userRepository = appDataSource.getRepository(User);

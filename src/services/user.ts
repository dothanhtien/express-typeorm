import { Request } from "express";
import {
  checkUserExistsByEmail,
  createUser,
  getUserById,
  getUsers,
} from "../stores";
import { BadRequestException, NotFoundException } from "../utils/exceptions";
import { hashPassword } from "../utils/auth";
import { transformToUserResponse } from "../responses";

export const createUserService = async (req: Request) => {
  const { email, password } = req.body;

  const isExist = await checkUserExistsByEmail(email);
  if (isExist) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = hashPassword(password);

  const user = await createUser({ ...req.body, password: hashedPassword });

  return { statusCode: 201, user: transformToUserResponse(user) };
};

export const getUsersService = async (req: Request) => {
  const users = await getUsers();

  return { users: users.map((x) => transformToUserResponse(x)) };
};

export const getUserService = async (req: Request) => {
  const { id } = req.params;

  const user = await getUserById(Number(id));
  if (!user) {
    throw new NotFoundException("User does not exist");
  }

  return { user: transformToUserResponse(user) };
};

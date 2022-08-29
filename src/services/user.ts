import { NextFunction, Request, Response } from "express";
import {
  checkUserExistsByEmail,
  createUser,
  getUserById,
  getUsers,
} from "../stores";
import { hashPassword } from "../utils/auth";
import { BadRequestException, NotFoundException } from "../utils/exceptions";

export const createUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const isExist = await checkUserExistsByEmail(email);

    if (isExist) {
      throw new BadRequestException("Email already exists");
    }

    const hashedPassword = hashPassword(password);

    const user = await createUser({ ...req.body, password: hashedPassword });

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUsersService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();

    res.json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await getUserById(Number(id));

    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

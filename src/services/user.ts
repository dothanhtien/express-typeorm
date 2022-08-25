import { NextFunction, Request, Response } from "express";
import { getUserById, getUsers } from "../stores";
import { NotFoundException } from "../utils/exceptions";

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

import { NextFunction, Request, Response } from "express";
import { getUserById } from "../stores";

export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await getUserById(Number(id));

    if (!user) {
      throw new Error("User does not exist");
    }

    res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

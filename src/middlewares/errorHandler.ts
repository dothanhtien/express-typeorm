import { NextFunction, Request, Response } from "express";
import {
  HttpException,
  InternalServerErrorException,
} from "../utils/exceptions";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.statusCode) {
    err = new InternalServerErrorException();
  }

  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

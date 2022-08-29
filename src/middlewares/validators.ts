import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    const { value, msg: message } = error;

    return { value, message };
  },
});

export const catchRequestError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

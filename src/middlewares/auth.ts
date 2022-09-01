import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForbiddenException, UnauthorizedException } from "../utils/exceptions";
import * as authConfig from "../config/auth";
import { getUserById } from "../stores";

export const authenticate = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let decodedData = null;

    if (!token) {
      throw new ForbiddenException("No token provided");
    }

    jwt.verify(token, authConfig.jwtSecret, (error, decoded) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedException("Token has expired");
        }

        throw new UnauthorizedException();
      }

      decodedData = decoded;
    });

    const user = await getUserById((decodedData as any).userId);
    if (!user) {
      throw new UnauthorizedException("Invalid token, user does not exist");
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

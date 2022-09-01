import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authConfig from "../../config/auth";
import { RefreshToken } from "../../database/entities/refreshToken";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);

  return isMatch;
};

export const generateAccessToken = (userId: number) => {
  const accessToken = jwt.sign({ userId }, authConfig.jwtSecret, {
    expiresIn: Number(authConfig.jwtTokenExpiration),
  });

  return accessToken;
};

export const verifyRefreshTokenExpiration = (refreshToken: RefreshToken) => {
  return refreshToken.expiry_date.getTime() < new Date().getTime();
};

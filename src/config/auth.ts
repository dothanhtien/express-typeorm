import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET as string;
export const jwtTokenExpiration = process.env.JWT_TOKEN_EXPIRATION as string;
export const jwtRefreshTokenExpiration = process.env
  .JWT_REFRESH_TOKEN_EXPIRATION as string;

import { Request } from "express";
import { transformToUserResponse } from "../responses";
import {
  checkUserExistsByEmail,
  createRefreshToken,
  createUser,
  deleteRefreshTokenById,
  getRefreshTokenById,
  getUserByEmail,
} from "../stores";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
  verifyRefreshTokenExpiration,
} from "../utils/auth";
import { BadRequestException, ForbiddenException } from "../utils/exceptions";

export const signUpService = async (req: Request) => {
  const { email, password } = req.body;

  const isExist = await checkUserExistsByEmail(email);
  if (isExist) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = hashPassword(password);

  const user = await createUser({ ...req.body, password: hashedPassword });

  return { statusCode: 201, user: transformToUserResponse(user) };
};

export const signInService = async (req: Request) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    throw new BadRequestException("Email or password is invalid");
  }

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    throw new BadRequestException("Email or password is invalid");
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = await createRefreshToken(user);

  return {
    user: transformToUserResponse(user),
    accessToken,
    refreshToken: refreshToken.id,
  };
};

export const getMyInfoService = async (req: Request) => {
  return { user: transformToUserResponse(req.user) };
};

export const refreshTokenService = async (req: Request) => {
  const { refreshToken: refreshTokenReq } = req.body;

  const refreshToken = await getRefreshTokenById(refreshTokenReq);
  if (!refreshToken) {
    throw new ForbiddenException("Refresh token is required");
  }

  if (verifyRefreshTokenExpiration(refreshToken)) {
    await deleteRefreshTokenById(refreshToken.id);

    throw new ForbiddenException(
      "Refresh token has expired. Please make a new sign in request"
    );
  }

  const accessToken = generateAccessToken(refreshToken.user.id);

  return { accessToken, refreshToken: refreshToken.id };
};

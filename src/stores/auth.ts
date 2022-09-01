import { refreshTokenRepository } from "../database/repositories";
import * as authConfig from "../config/auth";
import { User } from "../database/entities/user";

export const createRefreshToken = async (user: User) => {
  let expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + Number(authConfig.jwtRefreshTokenExpiration)
  );

  const refreshToken = await refreshTokenRepository.create({
    expiry_date: expiredAt,
    user,
  });

  return await refreshTokenRepository.save(refreshToken);
};

export const getRefreshTokenById = async (id: string) => {
  const refreshToken = await refreshTokenRepository.findOne({
    where: { id },
    relations: { user: true },
  });

  return refreshToken;
};

export const deleteRefreshTokenById = async (id: string) => {
  const result = await refreshTokenRepository.delete(id);

  return result;
};

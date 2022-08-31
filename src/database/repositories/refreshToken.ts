import { appDataSource } from "../app-data-source";
import { RefreshToken } from "../entities/refreshToken";

export const refreshTokenRepository = appDataSource.getRepository(RefreshToken);

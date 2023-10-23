import { auth } from "@config/auth";
import { UsersTokensRepository } from "@modules/account/repositories/implementations/UsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  username: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
  userId: string
}

export async function generateTokens(refreshToken: string): Promise<IResponse> {
  const { sub: userId, username } = verify(refreshToken, auth.secretsRefreshToken) as IPayload;

  const usersTokensRepository = container.resolve(UsersTokensRepository);

  const userToken = await usersTokensRepository.findByUserIdAndRefreshToken(userId, refreshToken);

  if (userToken) {
    await usersTokensRepository.deleteById(userToken.id);
  } else {
    throw new AppError("Token is missing", 401);
  }

  const newRefreshToken = sign(
    {},
    auth.secretsRefreshToken,
    { expiresIn: auth.expiresRefreshTokens },
  );

  const token = sign({ username }, auth.secretsToken, { expiresIn: auth.expiresTokens });

  const response = {
    token,
    refreshToken: newRefreshToken,
    userId,
  };

  return response;
}

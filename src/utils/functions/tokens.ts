import { auth } from "@config/auth";
import { sign, verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  username: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
  userId: string
}

export function generateTokens(refreshToken: string): IResponse {
  const { sub: userId, username } = verify(refreshToken, auth.secretsRefreshToken) as IPayload;

  const newRefreshToken = sign(
    { username },
    auth.secretsRefreshToken,
    { expiresIn: auth.expiresRefreshTokens, subject: userId },
  );

  const token = sign({}, auth.secretsToken, { expiresIn: auth.expiresTokens, subject: userId });

  const response = {
    token,
    refreshToken: newRefreshToken,
    userId,
  };

  return response;
}

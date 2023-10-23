import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUserCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const cookieReturn = request.headers.cookie;

    const [, refreshToken] = cookieReturn.split("=");

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const tokens = await refreshTokenUseCase.execute(refreshToken);

    return response.status(200).json(tokens);
  }
}

export { RefreshTokenController };

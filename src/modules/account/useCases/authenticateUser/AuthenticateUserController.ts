import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = bodySchema.parse(request.body);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const tokens = await authenticateUserUseCase.execute({ username, password });

    return response.status(200).json(tokens);
  }
}

export { AuthenticateUserController };

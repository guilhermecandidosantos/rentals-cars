import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userSchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
      admin: z.enum(["S", "N"]),
    });

    try {
      userSchema.parse(request.body);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

    const {
      name, username, email, password, admin,
    } = userSchema.parse(request.body);

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({
        name, username, email, password, admin,
      });

      return response.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { CreateUserController };

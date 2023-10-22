import { UsersRepository } from "@modules/account/repositories/implementations/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const userRepository = container.resolve(UsersRepository);

  const user = await userRepository.findUserById(id);

  if (user.admin === "N") {
    throw new AppError("Users isn't admin");
  }

  next();
}

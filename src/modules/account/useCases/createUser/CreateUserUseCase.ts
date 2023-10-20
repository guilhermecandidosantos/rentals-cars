import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name, username, email, password, admin,
  }: ICreateUserDTO): Promise<void> {
    let user = {};

    user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new AppError("Email already in use");
    }

    user = await this.userRepository.findUserByUsername(username);

    if (user) {
      throw new AppError("Username already in use");
    }

    const id = v4();

    const passwordHash = await hash(password, 8);

    try {
      await this.userRepository.create({
        id, name, username, email, password: passwordHash, admin,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { CreateUserUseCase };

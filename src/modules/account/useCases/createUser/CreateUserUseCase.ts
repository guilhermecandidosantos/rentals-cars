import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name, username, email, password, admin,
  }: ICreateUserDTO): Promise<void> {
    let user = {};

    user = await this.usersRepository.findUserByEmail(email);

    if (user) {
      throw new AppError("Email already in use");
    }

    user = await this.usersRepository.findUserByUsername(username);

    if (user) {
      throw new AppError("Username already in use");
    }

    const id = v4();

    const passwordHash = await hash(password, 8);

    try {
      await this.usersRepository.create({
        id, name, username, email, password: passwordHash, admin,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { CreateUserUseCase };

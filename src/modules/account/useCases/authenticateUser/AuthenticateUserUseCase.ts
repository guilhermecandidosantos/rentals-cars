import { auth } from "@config/auth";
import { IAuthenticateDTO } from "@modules/account/dtos/IAuthenticateDTO";
import { IResponseDTO } from "@modules/account/dtos/IResponseDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ username, password }: IAuthenticateDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findUserByUsername(username);

    if (!user) {
      throw new AppError("Username or Password invalid");
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new AppError("Username or Password invalid");
    }

    const token = jwt.sign({}, auth.secretsToken, {
      subject: user.id, expiresIn: auth.expiresTokens,
    });

    const refreshToken = jwt.sign({ username }, auth.secretsRefreshToken, {
      subject: user.id, expiresIn: auth.expiresRefreshTokens,
    });

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };

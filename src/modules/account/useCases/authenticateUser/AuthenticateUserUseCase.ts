import { auth } from "@config/auth";
import { IAuthenticateDTO } from "@modules/account/dtos/IAuthenticateDTO";
import { IResponseDTO } from "@modules/account/dtos/IResponseDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { IDateProvider } from "@shared/container/provider/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
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

    const id = v4();

    const expiresIn = this.dateProvider.expiresIn(1);

    const expiresDate = new Date(expiresIn);

    await this.usersTokensRepository.create({
      id, userId: user.id, refreshToken, expiresDate,
    });

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };

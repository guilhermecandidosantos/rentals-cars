import { IResponseDTO } from "@modules/account/dtos/IResponseDTO";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { inject, injectable } from "tsyringe";
import { generateTokens } from "utils/functions/tokens";
import { v4 } from "uuid";

import { IDateProvider } from "@shared/container/provider/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute(refreshToken: string): Promise<IResponseDTO> {
    const tokens = await generateTokens(refreshToken);

    const { token, refreshToken: refreshTokenNew, userId } = tokens;

    const id = v4();

    const expiresDate = this.dateProvider.expiresIn(1);

    const userToken = await this.usersTokensRepository
      .findByUserIdAndRefreshToken(userId, refreshToken);

    if (userToken) {
      await this.usersTokensRepository.deleteById(userToken.id);
    } else {
      throw new AppError("Token is missing", 401);
    }

    await this.usersTokensRepository.create({
      id, userId, refreshToken: refreshTokenNew, expiresDate,
    });

    return { token, refreshToken: refreshTokenNew };
  }
}

export { RefreshTokenUseCase };

import { IResponseDTO } from "@modules/account/dtos/IResponseDTO";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { inject, injectable } from "tsyringe";
import { generateTokens } from "utils/functions/tokens";
import { v4 } from "uuid";

import { IDateProvider } from "@shared/container/provider/dateprovider/IDateProvider";

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

    await this.usersTokensRepository.create({
      id, userId, refreshToken: refreshTokenNew, expiresDate,
    });

    return { token, refreshToken: refreshTokenNew };
  }
}

export { RefreshTokenUseCase };

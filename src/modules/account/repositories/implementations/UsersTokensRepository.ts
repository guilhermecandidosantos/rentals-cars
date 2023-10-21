import { IUserTokenDTO } from "@modules/account/dtos/IUserTokenDTO";
import { UserToken } from "@modules/account/entities/UserToken";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

@injectable()
class UsersTokensRepository implements IUsersTokensRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}
  async create({
    id, userId, refreshToken, expiresDate,
  }: IUserTokenDTO): Promise<void> {
    await this.prisma.user_Token.create({
      data: {
        id, userId, refreshToken, expiresDate,
      },
    });
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserToken> {
    const userToken = await this.prisma.user_Token.findFirst({ where: { userId, refreshToken } });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user_Token.delete({ where: { id } });
  }
}

export { UsersTokensRepository };
